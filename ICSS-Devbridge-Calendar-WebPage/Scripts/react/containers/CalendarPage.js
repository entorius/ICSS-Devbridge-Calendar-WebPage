import React, { Component } from 'react';
import Calendar from "../components/Calendar/Calendar";
import Grid from '@material-ui/core/Grid';
import SideBar from "./SideBar";
import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { grey, green, blue } from '@material-ui/core/colors';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import Button from '@material-ui/core/Button';
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormGroup from '@material-ui/core/FormGroup';

const styles = theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex'
    },
    pageTitle: {
        margin: '15px'
    },
    calendarSideBar: {
        minHeight: '100vh',
        width: '220px',
        backgroundColor: grey[200]
    },
    calendarIcon: {
        width: '30%',
        height: '30px'
    },
    checkboxLabel: {
        fontSize: '2rem'
    },
    addLearningDayButton: {
        fontSize: '14px',
        margin: '7px',
        color: "white !important"
    },
    checkboxes: {
        margin: '5px'
    }
});

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: blue
    }
});

class CalendarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTeamCalender: true,
            showPersonalCalender: true
        };
        this.selectCalendar = this.selectCalendar.bind(this);
    }

    selectCalendar = (event) => {
        this.setState({
            [event.target.name]: event.target.checked,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
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
                            <Calendar
                                showPersonalCalender={this.state.showPersonalCalender}
                                showTeamCalender={this.state.showTeamCalender}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.calendarSideBar}>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                            className={classes.root}>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justify="center">
                                <CalendarIcon className={classes.calendarIcon} />
                                <Typography
                                    variant="h4"
                                >
                                    Viewing list
                            </Typography>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                alignItems="center">
                                <FormGroup className={classes.checkboxes}>
                                    <FormControlLabel
                                        control={<Checkbox
                                            color="primary"
                                            checked={this.state.showPersonalCalender}
                                            onChange={this.selectCalendar}
                                            name="showPersonalCalender"
                                            style={{ width: 36, height: 36 }}
                                            icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 25 }} />}
                                            checkedIcon={<CheckBoxIcon style={{ fontSize: 25 }} />} />}
                                        label={<Typography className={classes.checkboxLabel}>Personal</Typography>}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            color="secondary"
                                            checked={this.state.showTeamCalender}
                                            onChange={this.selectCalendar}
                                            name="showTeamCalender"
                                            style={{ width: 36, height: 36 }}
                                            icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 25 }} />}
                                            checkedIcon={<CheckBoxIcon style={{ fontSize: 25 }} />} />}
                                        label={<Typography className={classes.checkboxLabel}>Team</Typography>}
                                    />
                                </FormGroup>
                            </Grid>
                            <Button className={classes.addLearningDayButton} variant="contained" color="primary">
                                Add learning day
                            </Button>
                        </Grid>
                    </div>
                </div >
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(CalendarPage);