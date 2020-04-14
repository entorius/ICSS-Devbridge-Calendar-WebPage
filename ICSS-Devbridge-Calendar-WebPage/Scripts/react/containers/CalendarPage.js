import React, { Component } from 'react';
import Calendar from "../components/Calendar/Calendar";
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    calendar: {
        width: '90%'
    }
});

class CalendarPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                    <Calendar className={classes.calendar} />
            </Grid>
        );
    }
}

export default withStyles(styles)(CalendarPage);