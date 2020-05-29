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
import { indigo } from '@material-ui/core/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import { fetchTopics, createTopic } from '../../redux/actions/topicActions';
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

class CreateTopicDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSaving: false
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            await this.props.fetchTopics(this.props.token.accessToken)
                .then(() => {
                    console.log("topics: " + this.props.topics)
                });
        }
    }

    onSubmit(values) {
        this.setState({ isSaving: true })
        this.props.createTopic(this.props.token.accessToken, values)
            .then(() => {
                this.setState({ isSaving: false })
                this.props.onClose()
                this.props.createTopicSuccess();
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
                    Create New Topic
                </DialogTitle>

                <Formik
                    initialValues={{ name: '', description: '', parentTopic: '' }}
                    onSubmit={this.onSubmit}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .required('Name is required')
                    })}
                >
                    {({
                        handleSubmit,
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur
                    }) => (<React.Fragment>
                        <DialogContent>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                className={classes.form}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.fieldLabel
                                        }
                                    }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    fullWidth
                                    required={true}
                                    error={touched.name && Boolean(errors.name)}
                                    size="medium"
                                    helperText={touched.name ? errors.name : ""}
                                />
                                <FormControl
                                    fullWidth>
                                    <InputLabel
                                        id="parentTopic"
                                        shrink={true}
                                        className={classes.fieldLabel}
                                    >
                                        Parent topic
                                    </InputLabel>
                                    <Select
                                        labelId="parentTopic"
                                        name="parentTopic"
                                        value={values.parentTopic}
                                        MenuProps={{ style: { fontSize: 25 } }}
                                        onChange={handleChange}
                                        fullWidth
                                        input={<Input />}
                                    >
                                        <MenuItem value={null} className={classes.fieldLabel}>None</MenuItem>
                                        {
                                            this.props.topics.map(topic => {
                                                return <MenuItem value={topic.TopicId} className={classes.fieldLabel}>
                                                    {topic.Name}
                                                </MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    name="description"
                                    label="Description"
                                    multiline
                                    rows="7"
                                    value={values.description}
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

CreateTopicDialog.propTypes = {
    fetchTopics: PropTypes.func.isRequired,
    createTopic: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    topics: state.topics.topics,
    token: state.login.token
})

const CreateTopicDialogStyled = withStyles(styles)(CreateTopicDialog);

export default connect(mapStateToProps, { fetchTopics, createTopic })(CreateTopicDialogStyled);