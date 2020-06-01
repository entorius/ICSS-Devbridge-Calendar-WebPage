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
            learningDays: this.props.learningDays
        }
    }

    handleClose = () => {
        this.props.onClose();
    };

    findUserInTree(teams, userId){
        if(teams.This.UserId == userId){
            return teams.This;
        }

        var child = null;
        if(teams.Children != null){
            for(let _child of teams.Children){
                child = this.findUserInTree(_child, userId);
                if(child != null){
                    break;
                }
            }
        }

        return child;
    }

    render() {
        const { classes } = this.props;

        const learningDays = this.state.learningDays.filter(day => day.date.getTime() == new Date(this.props.yearMonth + '/' + this.props.day).getTime());

        let learningDaysInfo = [];

        learningDays.forEach(day => {
            let info = {};
            info.user = this.findUserInTree(this.props.teamTree, day.createdBy);
            info.topic = this.props.topics.find((topic) => topic.TopicId == day.topic);
            info.learningDay = day;

            learningDaysInfo.push(info);
        });
        
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
                            {this.props.yearMonth}/{this.props.day}
                    </DialogTitle>

                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        {learningDaysInfo.map(info => {
                            return <LearningDayInfoPopover
                                key={info.learningDay.date + " " + info.learningDay.topic + " " + info.learningDay.createdBy}
                                topic={info.topic != null ? info.topic : null}
                                user={info.user.FirstName + ' ' + info.user.LastName}
                                width="160px"
                                color={info.learningDay.createdBy == this.props.user.UserId ? green[500] : blue[500]}
                                comment={info.learningDay.comment}
                                assignment={info.learningDay.id}
                                date={format(info.learningDay.date, "MM/dd/yyyy")}
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