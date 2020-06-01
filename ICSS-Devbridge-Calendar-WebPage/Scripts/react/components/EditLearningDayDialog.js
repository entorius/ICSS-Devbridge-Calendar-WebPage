import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import BookIcon from '@material-ui/icons/Book';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'; 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import AddLearningDayTopicsDialog from "./AddLearningDayTopicsDialog";
import PropTypes from 'prop-types';
import { updateAssignment } from "../redux/actions/assignmentActions"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        padding: "10px",
        width: "370px"
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
        '& .MuiFormControl-root': {
            marginBottom: theme.spacing(4),
            marginTop: 0,
        }
    },
    button: {
        width: "25%",
    },
    buttonWhiteColorText: {
        color: "white !important"
    },


});

class EditLearningDayDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            topic: { id: this.props.selectedTopic.TopicId, name: this.props.selectedTopic.Name},
            comment: this.props.comment,
            openAddLearningDayTopicsDialog: false,
            links: ""
        }
    }
    
    componentDidMount(){
        let formattedDate = new Date(this.state.date);
        formattedDate = (formattedDate.getMonth() + 1) + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear();
        this.setState({date: formattedDate})
    }

    handleClose = () => {
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
        this.setState({ openAddLearningDayTopicsDialog: true });
    }


    handleCloseTopicsDialog = () => {
        this.setState({ openAddLearningDayTopicsDialog: false })
    };

    updateTopics = (selectedTopic) => {
        console.log(selectedTopic)
        this.setState({ topic: selectedTopic })
    };

    updateAssignment() {
        const updateData = {id: this.props.assignment, topicId: this.state.topic.id, comments: this.state.comment, date: this.state.date};
        this.props.updateAssignment(this.props.token.accessToken, updateData);
        this.setState({topic: null});
        this.props.onClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <BookIcon className={classes.bookIcon} />
                            Edit a learning day
                        </Grid>
                    </DialogTitle>

                    <DialogContent>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                style={{ width: 300, marginRight: "20px" }}
                                className={classes.form}>
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
                            <Typography variant="h5" style={{marginBottom: 10}}>{this.state.topic == undefined ? "" : "Topic selected: " + this.state.topic.name}</Typography>
                                <Button
                                    onClick={this.handleOpenTopicsDialog}
                                    variant="contained"
                                    className={[classes.button, classes.buttonWhiteColorText].join(' ')}
                                    color="primary"
                                    style={{marginBottom: 20}}
                                    >
                                    Choose topic
                                </Button>
                                <AddLearningDayTopicsDialog
                                    updateTopics={this.updateTopics}
                                    open={this.state.openAddLearningDayTopicsDialog}
                                    onClose={this.handleCloseTopicsDialog}
                                    selectedTopic={this.state.topic} 
                                    topics={this.props.topics} />
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
                                    className={classes.button}>
                                    Cancel
                               </Button>
                                <Button
                                    onClick={() => {this.updateAssignment()}}
                                    variant="contained"
                                    disabled={this.state.topic == null ? true : false}
                                    className={[classes.button, classes.buttonWhiteColorText].join(' ')}
                                    color="secondary">
                                    Save
                               </Button>
                            </Grid>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        )
    }

}

EditLearningDayDialog.propTypes = {
    updateAssignment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    topics: state.topics.topics,
    token: state.login.token
});

export default connect(mapStateToProps, {updateAssignment})(withStyles(styles)(EditLearningDayDialog));