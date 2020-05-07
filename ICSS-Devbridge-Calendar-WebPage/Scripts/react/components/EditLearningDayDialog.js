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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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
            date: new Date(),
            topic: "",
            comment: "",
            links: "",
            topics: ["topic1", "subtopic1", "subtopic2", "topic2", "subsubtopic1"]
        }
    }

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
                            <FormControl
                                fullWidth>
                                <InputLabel id="topics-select" shrink="true">Topic</InputLabel>
                                <Select
                                    labelId="topics-select"
                                    value={this.state.topic}
                                    onChange={this.handleFormChange('topic')}
                                    fullWidth
                                >
                                <MenuItem aria-label="None" value="" />
                                {
                                    this.state.topics.map(t => {
                                        return (
                                            <MenuItem value={t}>{t}</MenuItem>
                                        )
                                    })
                                }
                                </Select>
                            </FormControl>
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
                                    onClick={this.props.onClose}
                                    variant="contained"
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

export default withStyles(styles)(EditLearningDayDialog);