import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

import { indigo } from '@material-ui/core/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePickerFomik from "../../components/DatePickerFomik";

import { connect } from 'react-redux';
import { fetchTopics, createTopic } from '../../redux/actions/topicActions';
import { postNewAssignment } from '../../redux/actions/assignmentActions';
import { selectCurrentTeam } from '../../redux/actions/teamActions';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        padding: "10px",
        width: "370px"
    },
    dialogTitle: {
        fontSize: 25,
        textAlign: "center"
    },
    bookIcon: {
        width: '30px',
        height: '30px'
    },
    form: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(4),
            marginTop: 0,
        },
        '& .MuiFormControl-root': {
            marginBottom: theme.spacing(4),
            marginTop: 0,
        }
    },
    buttonWhiteColorText: {
        color: "white !important"
    },
    alert: {
        "& .MuiAlert-icon": {
            fontSize: 25
        },
        "& .MuiAlert-message": {
            fontSize: 15
        }
    },
    fieldLabel: {
        fontSize: 20
    },
    saveButton: {
        background: indigo[500]
    }
});

class CreateNewAssignmentDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            isSaving: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        console.log(props);
    }
    async componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.props.selectCurrentTeam(this.props.teamMembers, this.props.managerId);
        }
    }

    async onSubmit(values) {
        this.setState({ isSaving: true });
        console.log("submitting");
        await this.props.postNewAssignment(this.props.token.accessToken, values)
            .then(() => {
                this.setState({ isSaving: false })
                this.props.onClose()
            })
        this.onSubmit = this.onSubmit.bind(this)
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog aria-labelledby="add-learning-day"
                onClose={this.props.onClose}
                open={this.props.open}
                fullWidth="true"
                PaperProps={{
                    classes: {
                        root: classes.root
                    }
                }}>
                <DialogTitle id="add-learning-day"
                    disableTypography="true"
                    classes={{ root: classes.dialogTitle }} >
                    Create New Assignment
                </DialogTitle>

                <Formik
                    initialValues={{ comments: '', topicId: '', date: new Date(), userId: '' }}
                    onSubmit={this.onSubmit}
                    validationSchema={Yup.object().shape({
                        topicId: Yup.string()
                            .required('Topic is required'),
                        userId: Yup.string()
                            .required('User is required')
                    })}
                >
                    {({
                        handleSubmit,
                        values,
                        touched,
                        errors,
                        handleChange,
                        setFieldValue,
                        handleBlur
                    }) => (<React.Fragment>
                        <DialogContent>
                            <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    className={classes.form}>
                                    <FormControl fullWidth>
                                        <DatePickerFomik name="date" />
                                        <FormHelperText id="name-error" style={{ fontSize: 12 }}>
                                            {touched.date ? errors.date : ""}
                                        </FormHelperText>
                                    </FormControl>
                                    
                                <FormControl
                                    fullWidth>
                                    <InputLabel
                                        id="topic"
                                        shrink={true}
                                        className={classes.fieldLabel}
                                    >
                                            Topic
                                    </InputLabel>
                                        <Select
                                            labelId="Topic"
                                            name="topicId"
                                            value={values.topicId}
                                            MenuProps={{ style: { fontSize: 25 } }}
                                            onChange={handleChange}
                                            fullWidth
                                            input={<Input />}
                                        >
                                            <MenuItem value={""} className={classes.fieldLabel}>None</MenuItem>
                                            {
                                                this.props.topics.topics.map(topic => {
                                                    return <MenuItem value={topic.TopicId} className={classes.fieldLabel}>
                                                        {topic.Name}
                                                    </MenuItem>
                                                })
                                            }
                                        </Select>
                                        <FormHelperText id="name-error" style={{ fontSize: 12 }}>
                                            {touched.topicId ? errors.topicId : ""}
                                        </FormHelperText>
                                </FormControl>
                                <FormControl
                                    fullWidth>
                                    <InputLabel
                                        id="parentTopic"
                                        shrink={true}
                                        className={classes.fieldLabel}
                                    >
                                        Select User
                                    </InputLabel>
                                    <Select
                                        labelId="userId"
                                        name="userId"
                                        value={values.userId}
                                        MenuProps={{ style: { fontSize: 25 } }}
                                        onChange={handleChange}
                                        fullWidth
                                        input={<Input />}
                                    >
                                        <MenuItem value={""} className={classes.fieldLabel}>None</MenuItem>
                                            {
                                                this.props.teamTree.selectedTeam.map(user => {
                                                return <MenuItem value={user.This.UserId} className={classes.fieldLabel}>
                                                    {user.This.FirstName} {user.This.LastName} {user.This.Role}
                                                </MenuItem>
                                            })
                                        }
                                        </Select>
                                        <FormHelperText id="name-error" style={{ fontSize: 12 }}>
                                            {touched.userId ? errors.userId : ""}
                                        </FormHelperText>
                                </FormControl>
                                <TextField
                                    name="comments"
                                    label="Comments"
                                    multiline
                                    rows="7"
                                    value={values.comments}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.fieldLabel
                                        }
                                    }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    fullWidth
                                    size="medium"
                                />
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="flex-start">
                                <Button
                                    onClick={this.props.onClose}
                                    variant="outlined"
                                    size="medium">
                                    Cancel
                                    </Button>
                                <Button
                                    onClick={handleSubmit}
                                    variant="contained"
                                    className={classes.buttonWhiteColorText}
                                    disabled={this.state.isSaving}
                                    size="medium"
                                    classes={{
                                        root: classes.saveButton,
                                        focus: classes.saveButton
                                    }}>
                                    Save
                                </Button>
                            </Grid>
                        </DialogActions>
                    </React.Fragment>)}
                    </Formik>
            </Dialog>
        );
    }
}

CreateNewAssignmentDialog.propTypes = {
    fetchTopics: PropTypes.func.isRequired,
    createTopic: PropTypes.func.isRequired,
    selectCurrentTeam: PropTypes.func.isRequired,
    postNewAssignment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    token: state.login.token,
    topics: state.topics,
    teamTree: state.teamTree
})

const CreateNewAssignmentDialogStyled = withStyles(styles)(CreateNewAssignmentDialog);

export default connect(mapStateToProps, { fetchTopics, createTopic, selectCurrentTeam, postNewAssignment })(CreateNewAssignmentDialogStyled);