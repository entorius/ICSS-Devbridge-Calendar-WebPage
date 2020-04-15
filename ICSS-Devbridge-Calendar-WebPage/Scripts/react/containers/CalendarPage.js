import React, { Component } from 'react';
import Calendar from "../components/Calendar/Calendar";
import Grid from '@material-ui/core/Grid';
import SideBar from "./SideBar";
import CalendarSideBar from "../components/CalanderSideBar";
import Typography from '@material-ui/core/Typography';


import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex'
    },
    pageTitle: {
        margin: '15px'
    }
});

class CalendarPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                <SideBar />
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                >
                    <Typography
                        variant="h2"
                        className={classes.pageTitle}
                    >
                        CALENDAR
                    </Typography>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Calendar />
                    </Grid>
                </Grid>
                <CalendarSideBar />
            </div  >
        );
    }
}

export default withStyles(styles)(CalendarPage);