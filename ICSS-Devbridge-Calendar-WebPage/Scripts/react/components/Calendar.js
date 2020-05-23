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
import { withStyles } from '@material-ui/core/styles';
import { indigo, green, blue } from '@material-ui/core/colors';
import ViewAllLearningDayTopicsDialog from './ViewAllLearningDayTopicsDialog';
import LearningDayInfoPopover from './LearningDayInfoPopover';
import Link from '@material-ui/core/Link';



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
            learningDays: [
                { date: new Date('2020-05-25'), topic: 'topic1', createdBy: "Me" },
                { date: new Date('2020-05-05'), topic: 'subtopic1', createdBy: "Employee1" },
                { date: new Date('2020-05-05'), topic: 'topic2', createdBy: "Me" },
                { date: new Date('2020-05-20'), topic: 'subtopic1', createdBy: "Employee2" },
                { date: new Date('2020-05-20'), topic: 'topic2', createdBy: "Me" },
                { date: new Date('2020-05-20'), topic: 'topic1', createdBy: "Me" }
            ],
            openShowAllLearningTopics: false,
            showAllLearningTopicsDate: null
        }
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
                    console.log("moreTopicsNumber " + moreTopicsNumber)
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
                        if (learningDay.createdBy == "Me" && this.props.showPersonalCalender) {
                            learningDayInfo.push(<LearningDayInfoPopover
                                topic={learningDay.topic}
                                width="120px"
                                date={format(learningDay.date, "MM/dd/yyyy")}
                                color={green[500]}
                            />)
                        }
                        if (learningDay.createdBy != "Me" && this.props.showTeamCalender) {
                            learningDayInfo.push(<LearningDayInfoPopover
                                topic={learningDay.topic}
                                width="120px"
                                date={format(learningDay.date, "MM/dd/yyyy")}
                                color={blue[500]}
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
            days = []
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
                    yearMonth={format(this.state.currentMonth, "yyyy MMMM")}
                    day={this.state.showAllLearningTopicsDate}
                    open={this.state.openShowAllLearningTopics}
                    onClose={this.handleCloseDialog} />
            </Paper>
        );
    }
}

export default withStyles(styles)(Calendar);