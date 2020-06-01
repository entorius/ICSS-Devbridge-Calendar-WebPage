import React, { Component } from 'react';
import { Typography, Table, TableBody, TableCell, TableRow, Card, CardActionArea, CardContent, TableHead, createMuiTheme, Paper, Button, IconButton, MuiThemeProvider, Grid } from '@material-ui/core';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import toDate from "date-fns/toDate";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import { CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { indigo, green, blue } from '@material-ui/core/colors';
import ViewAllLearningDayTopicsDialog from './ViewAllLearningDayTopicsDialog';
import LearningDayInfoPopover from './LearningDayInfoPopover';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAssignments, fetchSubordinateAssignments } from '../redux/actions/assignmentActions';
import { fetchTopics } from '../redux/actions/topicActions';
import { fetchTeamTree } from '../redux/actions/teamActions';
import { fetchCurrentUser } from '../redux/actions/userActions';



const styles = theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex',

    },
    pageTitle: {
        margin: '15px'
    },
    weekdaytableCell: {
        height: "25px",
        width: "160px",
        border: '1px solid grey',
        margin: "0px",
        backgroundColor: indigo[900],
        color: "white !important",
        fontSize: "17px"
    },
    tableCell: {
        height: "120px",
        width: "160px",
        border: '1px solid grey',
        margin: "0px",
        verticalAlign: 'top',
        fontSize: "14px"
    },
    card: {
        height: "30px",
        width: "120px",
        margin: "0px",
        padding: "0px",
        textAlign: 'left',
        marginBottom: "5px"
    },
    blueColor: {
        backgroundColor: blue[500],
    },
    greenColor: {
        backgroundColor: green[500],
    },
    action: {
        padding: "2px",
        margin: "0px",
        height: "30px",
        width: "100px",
    },
    table: {
        padding: "10px",
        display: 'grid',
        gridTemplateColumns: 'repeat(autofit, minmax(100px, 1fr))'
    },
    greyTableCellTextColor: {
        color: "grey !important"
    }
});


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            learningDays: [],
            openShowAllLearningTopics: false,
            showAllLearningTopicsDate: null,
            hasLearningDays: true
        }
    }

    componentDidMount() {
        this.props.fetchTopics(this.props.token.accessToken);
        this.props.fetchTeamTree(this.props.token.accessToken);
        this.props.fetchCurrentUser(this.props.token.accessToken);

        this.props.fetchAssignments(this.props.token.accessToken)
            .then(() => {
                this.props.fetchSubordinateAssignments(this.props.token.accessToken)
                    .then(() => {
                        let learningDays = this.formatAssignmentsAsDays(this.props.assignments);
                        const teamLearningDays = this.formatAssignmentsAsDays(this.props.teamAssignments);
                        learningDays = learningDays.concat(teamLearningDays);
                        this.setState({learningDays: learningDays});
                        if(learningDays.length == 0)
                            this.setState({hasLearningDays: false});
                    });
            });
    }

    formatAssignmentsAsDays(assignments){
        let learningDays = [];

        assignments.forEach(assignment => {
            let learningDay = { 
                id: assignment.AsgnId, 
                date: new Date(assignment.Date), 
                topic: assignment.TopicId, 
                createdBy: assignment.UserId, 
                comment: assignment.Comments
            };
            learningDays.push(learningDay)
        })

        return learningDays;
    }

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

    handleOpenDialog = (day) => {
        this.setState({ openShowAllLearningTopics: true, showAllLearningTopicsDate: day })
    };

    handleCloseDialog = () => {
        this.setState({ openShowAllLearningTopics: false })
    };

    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };
    
    render() {
        if(this.props.topics.length == 0 || this.props.teamTree.items.length == 0 || (this.state.learningDays.length == 0 && this.state.hasLearningDays)){
            return <CircularProgress></CircularProgress>
        }
        const { classes } = this.props;
        const weekdays = [{ id: 1, day: "Sun" }, { id: 2, day: "Mon" }, { id: 3, day: "Tue" }, { id: 4, day: "Wed" }, { id: 5, day: "Thu" }, { id: 6, day: "Fri" }, { id: 7, day: "Sat" }];
        const dateFormat = "MMMM yyyy";

        const { currentMonth } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dayFormat = "d";

        let days = [];
        let weeks = [];
        let day = startDate;
        let formattedDate = "";
        let learningDayList = [];
        let learningDayInfo = [];
        let topicsFitIntoCell;


        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                let moreTopicsNumber = 0;
                let numOfTeamTopics = 0;
                let numOfMyTopics = 0;
                formattedDate = format(day, dayFormat);
                learningDayList = this.state.learningDays.filter(learningDay => learningDay.date.toDateString() === day.toDateString())
                numOfTeamTopics = learningDayList.filter(learningDay => learningDay.createdBy != "Me").length
                if (this.props.showPersonalCalender) {
                    let numOfMyTopics = learningDayList.length - numOfTeamTopics
                    moreTopicsNumber += numOfMyTopics;
                }
                if (this.props.showTeamCalender) {
                    moreTopicsNumber += numOfTeamTopics;
                }
                moreTopicsNumber -= 2

                if (moreTopicsNumber > 0) {
                    topicsFitIntoCell = false;
                    learningDayList = learningDayList.slice(0, 2);
                }
                else {
                    topicsFitIntoCell = true;
                }

                if (learningDayList.length > 0) {

                    learningDayList.forEach(learningDay => {
                        const topic = this.props.topics.find((topic) => topic.TopicId == learningDay.topic);
                        const user = this.findUserInTree(this.props.teamTree.items, learningDay.createdBy);
                        if (learningDay.createdBy == this.props.currentUser.UserId && this.props.showPersonalCalender) {
                            learningDayInfo.push(<LearningDayInfoPopover
                                key={learningDay.date + " " + learningDay.topic + " " + learningDay.createdBy}
                                topic={topic != null ? topic : null}
                                user={user.FirstName + ' ' + user.LastName}
                                width="120px"
                                date={format(learningDay.date, "MM/dd/yyyy")}
                                color={green[500]}
                                comment={learningDay.comment}
                                assignment={learningDay.id}
                            />)
                        }
                        else if (learningDay.createdBy != this.props.currentUser.UserId && this.props.showTeamCalender) {
                            learningDayInfo.push(<LearningDayInfoPopover
                                key={learningDay.date + " " + learningDay.topic + " " + learningDay.createdBy}
                                topic={topic != null ? topic : null}
                                user={user.FirstName + ' ' + user.LastName}
                                width="120px"
                                date={format(learningDay.date, "MM/dd/yyyy")}
                                color={blue[500]}
                                comment={learningDay.comment}
                                assignment={learningDay.id}
                            />)

                        }
                    })
                }
                let dayObj = { 'date': formattedDate, 'learningDayCards': learningDayInfo, 'belongsToThisMonth': isSameMonth(day, monthStart), topicsFitIntoCell: topicsFitIntoCell, moreTopicsNumber: moreTopicsNumber };
                days.push(dayObj)
                day = addDays(day, 1);
                learningDayInfo = []
                learningDayList = []
            }
            weeks.push(days)
            days = [];
        }
        return (
            <Paper>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <IconButton onClick={this.prevMonth}><ChevronLeftIcon /></IconButton>
                    <Typography variant="h4">{format(this.state.currentMonth, dateFormat)}</Typography>
                    <IconButton onClick={this.nextMonth}><ChevronRightIcon /></IconButton>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {weekdays.map((day) => {
                                return (
                                    <TableCell
                                        className={classes.weekdaytableCell}
                                    >
                                        {day.day}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weeks.map(week => {
                            return (
                                <TableRow>
                                    {week.map(day =>
                                        <TableCell
                                            align="right"
                                            className={!day.belongsToThisMonth ? [classes.tableCell, classes.greyTableCellTextColor].join(' ') : classes.tableCell}
                                            key={day}>
                                            {day.date}
                                            {day.learningDayCards.map(learningDayCard =>
                                                learningDayCard
                                            )}
                                            {!day.topicsFitIntoCell ?
                                                <Link
                                                    component="button"
                                                    variant="body2"
                                                    style={{ fontSize: "12px", color: indigo[900] }}
                                                    onClick={() => this.handleOpenDialog(day.date)}
                                                >{day.moreTopicsNumber} more</Link> :
                                                null}
                                        </TableCell>)}
                                </TableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
                <ViewAllLearningDayTopicsDialog
                    yearMonth={format(this.state.currentMonth, "yyyy/MM")}
                    day={this.state.showAllLearningTopicsDate}
                    open={this.state.openShowAllLearningTopics}
                    learningDays={this.state.learningDays}
                    teamTree={this.props.teamTree.items}
                    topics={this.props.topics}
                    user={this.props.currentUser}
                    onClose={this.handleCloseDialog} />
            </Paper>
        );
    }
}

Calendar.propTypes = {
    fetchAssignments: PropTypes.func.isRequired,
    fetchTopics: PropTypes.func.isRequired,
    fetchTeamTree: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    fetchSubordinateAssignments: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    assignments: state.assignments.items,
    teamAssignments: state.assignments.teamAssignments,
    token: state.login.token,
    topics: state.topics.topics,
    teamTree: state.teamTree,
    currentUser: state.users.user,
});

export default connect(mapStateToProps, { fetchAssignments, fetchTopics, fetchTeamTree, fetchCurrentUser, fetchSubordinateAssignments })(withStyles(styles)(Calendar));