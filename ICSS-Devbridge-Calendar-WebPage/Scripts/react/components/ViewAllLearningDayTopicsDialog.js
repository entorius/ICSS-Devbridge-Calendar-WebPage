import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import LearningDayInfoPopover from './LearningDayInfoPopover';
import { green, blue } from '@material-ui/core/colors';
import format from "date-fns/format";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        padding: "10px",
        width: "370px"
    },
    dialogTitle: {
        fontSize: 25,
        textAlign: "center"
    },

});

class ViewAllLearningDayTopicsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [
                { date: new Date('2020-05-20'), topic: 'subtopic1', createdBy: "Employee2" },
                { date: new Date('2020-05-20'), topic: 'topic2', createdBy: "Me" },
                { date: new Date('2020-05-20'), topic: 'topic1', createdBy: "Me" }
            ],
        }
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { classes } = this.props;
        return (
                <Dialog aria-labelledby="show-all-learning-topics"
                    onClose={this.props.onClose}
                    open={this.props.open}
                    titleStyle={{ textAlign: "center" }}
                    PaperProps={{
                        classes: {
                            root: classes.root
                        }
                    }}>

                    <DialogTitle id="show-all-learning-topics"
                        disableTypography="true"
                        classes={{ root: classes.dialogTitle }} >
                            {this.props.yearMonth} {this.props.day}
                    </DialogTitle>

                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        {this.state.topics.map(topic => {
                            return <LearningDayInfoPopover
                                topic={topic.topic}
                                width="160px"
                                date={format(topic.date, "MM/dd/yyyy")}
                                color={topic.createdBy == "Me" ? green[500] : blue[500]}
                            />
                        })}  
                    </Grid>
                </DialogContent>
                <DialogActions>
                            <Button
                                onClick={this.props.onClose}
                                variant="outlined"
                                fullWidth={true}>
                                Cancel
                            </Button>
                    </DialogActions>
                </Dialog>
        )
    }

}

export default withStyles(styles)(ViewAllLearningDayTopicsDialog);