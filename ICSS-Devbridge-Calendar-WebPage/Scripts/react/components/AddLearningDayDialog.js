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
            topics: ["Topic1", "Subtopic1"],
            openAddLearningDayTopicsDialog: false
        }
    }

    updateTopics = (selectedToptics) => {
        this.setState({ topics: selectedToptics })
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleFormChange = (name) => (event) => {
        if (name != 'date') {
            this.setState({ [name]: event.target.value });
        }
        else {
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
                            </Grid>
                            <List
                                style={{ width: 250, border: "2px solid grey", height: 320, maxHeight: 320, overflow: 'auto' }}>
                                    {
                                        this.state.topics.map(topic => {
                                            return (
                                                <ListItem>
                                                        <Typography variant="h5">{topic}</Typography>
                                                    <IconButton disableRipple size="small">
                                                            <CloseIcon />
                                                        </IconButton>
                                                </ListItem>
                                            )
                                        })
                                    }
                            </List>
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
                                justify="flex-end"
                                style={{marginBottom: 10}}>
                                <Button
                                    onClick={this.handleOpenTopicsDialog}
                                    variant="contained"
                                    className={[classes.button, classes.buttonWhiteColorText].join(' ')}
                                    color="primary">
                                    Edit topic
                               </Button>
                                <AddLearningDayTopicsDialog
                                    updateTopics={this.updateTopics}
                                    topics={this.state.topics}
                                    open={this.state.openAddLearningDayTopicsDialog}
                                    onClose={this.handleCloseTopicsDialog} />
                            </Grid>
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
                                    onClick={this.props.onClose}
                                    variant="contained"
                                    className={[classes.button, classes.buttonWhiteColorText].join(' ')}
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

export default withStyles(styles)(AddLearningDayDialog);