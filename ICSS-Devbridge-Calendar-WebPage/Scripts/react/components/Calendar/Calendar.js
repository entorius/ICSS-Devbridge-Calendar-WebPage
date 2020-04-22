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
        width: "150px",
        border: '1px solid grey',
        margin: "0px",
        backgroundColor: indigo[900],
        color: "white !important",
        fontSize: "17px"
    },
    tableCell: {
        height: "120px",
        width: "150px",
        border: '1px solid grey',
        margin: "0px",
        verticalAlign: 'top',
        fontSize: "12px"
    },
    card: {
        height: "30px",
        width: "100px",
        padding: "0px",
        textAlign: 'left'
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
    }
});


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            learningDays: [
                { date: new Date('2020-04-25'), topic: 'topic1', createdBy: "Me" },
                { date: new Date('2020-04-05'), topic: 'subtopic1', createdBy: "Employee1" }
            ]
        }
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
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

        const { currentMonth, selectedDate } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dayFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";
        let learningDay = null;;
        var learningDayInfo = null;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dayFormat);

                learningDay = this.state.learningDays.find(learningDay => learningDay.date.toDateString() === day.toDateString())
                if (learningDay != null) {
                    if (learningDay.createdBy == "Me" && this.props.showPersonalCalender) {
                        learningDayInfo = <Card className={[classes.greenColor, classes.card].join(' ')}>
                            <CardActionArea className={classes.action}>
                                <Typography component="h5" variant="h5">
                                    {learningDay.topic}
                                </Typography>
                            </CardActionArea>
                        </Card>
                    }
                    if (learningDay.createdBy != "Me" && this.props.showTeamCalender) {
                        learningDayInfo = <Card className={[classes.blueColor, classes.card].join(' ')}>
                            <CardActionArea className={classes.action}>
                                <Typography component="h5" variant="h5">
                                    {learningDay.topic}
                                </Typography>
                            </CardActionArea>
                        </Card>
                    }
                }
                else {
                    learningDayInfo = null
                }
                days.push(
                    <TableCell
                        align="right"
                        className={classes.tableCell}
                        key={day}
                    >
                        {formattedDate}
                        {learningDayInfo}
                    </TableCell>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <TableRow className="row" key={day}>
                    {days}
                </TableRow>
            );
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
                    <TableBody>{rows}</TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(Calendar);