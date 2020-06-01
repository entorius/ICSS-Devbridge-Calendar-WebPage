import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import BookIcon from '@material-ui/icons/Book';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import AddLearningDayTopicsDialog from "./AddLearningDayTopicsDialog";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postNewAssignment } from '../redux/actions/assignmentActions'

const styles = theme => ({
    root: {
        padding: "10px",
        maxWidth: "650px"
    },
    dialogTitle: {
        fontSize: 25,
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
    },
    button: {
        width: "25%",
    },
    buttonWhiteColorText: {
        color: "white !important"
    },


});

class AddLearningDayDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            comment: "",
            links: "",
            topic: null,
            openAddLearningDayTopicsDialog: false
        }
    }

    componentDidMount(){
        let formattedDate = this.state.date;
        formattedDate = (formattedDate.getMonth() + 1) + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear();
        this.setState({date: formattedDate})
    }

    updateTopics = (selectedTopic) => {
        this.setState({ topic: selectedTopic })
    };

    handleClose = (action) => {
        if(action == 'Create'){
            const postData = { userId: this.props.currentUser.UserId, topicId: this.state.topic.id, comments: this.state.comment, date: this.state.date };
            this.props.postNewAssignment(this.props.token.accessToken, postData);
        }

        this.state.topic = null;
        this.props.onClose();
    };

    handleFormChange = (name) => (event) => {
        if (name != 'date') {
            this.setState({ [name]: event.target.value });
        }
        else {
            event = (event.getMonth() + 1) + "/" + event.getDate() + "/" + event.getFullYear();
            this.setState({ [name]: event });
        }
    };

    handleOpenTopicsDialog = () => {
        this.setState({ openAddLearningDayTopicsDialog: true })
    };

    handleCloseTopicsDialog = () => {
        this.setState({ openAddLearningDayTopicsDialog: false })
    };

    render() {
        const { classes } = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog aria-labelledby="add-learning-day"
                    onClose={() => {this.handleClose()}}
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
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <BookIcon className={classes.bookIcon} />
                            Add new learning day
                        </Grid>
                    </DialogTitle>

                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                            className={classes.form}>
                            <Grid
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                                style={{ width: 300, marginRight: "20px"}}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    id="learning-day-date"
                                    label="Date"
                                    value={this.state.date}
                                    onChange={this.handleFormChange('date')}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    inputProps={{ style: { fontSize: 15 } }} 
                                    fullWidth
                                />
                                <TextField
                                    id="learning-day-comment"
                                    label="Comments"
                                    multiline
                                    rows="6"
                                    value={this.state.comment}
                                    onChange={this.handleFormChange('comment')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{ style: { fontSize: 15 } }} 
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                />
                                <TextField
                                    id="learning-day-links"
                                    label="Links"
                                    multiline
                                    rows="6"
                                    value={this.state.links}
                                    onChange={this.handleFormChange('links')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{ style: { fontSize: 15 } }} 
                                    variant="outlined"
                                    fullWidth
                                />
                                <Typography variant="h5" style={{marginBottom: 10}}>{this.state.topic == undefined ? "" : "Topic selected: " + this.state.topic.name}</Typography>
                                <Button
                                    onClick={this.handleOpenTopicsDialog}
                                    variant="contained"
                                    className={[classes.button, classes.buttonWhiteColorText].join(' ')}
                                    color="primary">
                                    Choose topic
                                </Button>
                                <AddLearningDayTopicsDialog
                                    updateTopics={this.updateTopics}
                                    open={this.state.openAddLearningDayTopicsDialog}
                                    onClose={this.handleCloseTopicsDialog} 
                                    topics={this.props.topics}
                                    />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-end"
                        >
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="flex-start">
                                <Button
                                    onClick={() => {this.handleClose('Cancel')}}
                                    variant="outlined"
                                    className={classes.button}>
                                    Cancel
                               </Button>
                                <Button
                                    onClick={() => {this.handleClose('Create')}}
                                    variant="contained"
                                    className={[classes.button, classes.buttonWhiteColorText].join(' ')}
                                    disabled={this.state.topic == null ? true : false}
                                    color="secondary">
                                    Create
                               </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        )
    }
}

AddLearningDayDialog.propTypes = {
    postNewAssignment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    token: state.login.token,
    currentUser: state.users.user
});

export default connect(mapStateToProps, { postNewAssignment })(withStyles(styles)(AddLearningDayDialog));