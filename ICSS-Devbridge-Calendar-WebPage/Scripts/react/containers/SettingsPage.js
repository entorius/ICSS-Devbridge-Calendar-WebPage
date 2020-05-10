import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { green, blue, grey, indigo } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SideBar from "../components/SideBar";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: grey[100]
    },
    pageTitle: {
        margin: '15px'
    },
    paper: {
        margin: '5px',
        width: "70%"
    },
    pagePadding: {
        padding: "15px"
    },
    itemTitle: {
        color: indigo[900]
    },
    inputFontSize: {
        fontSize: 15
    }
});

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: blue,
        textPrimary: grey
    }
});

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            comfirmPassword: "",
            showPassword: false,
            showConfirmPassword: false
        }
    }

    handleInputFieldChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };

    handleClickShowPassword = (name) => {
        this.setState(prevState => ({
            [name]: !prevState[name]
        }))
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                        justify="flex-start"
                        alignItems="flex-start"
                        className={classes.pagePadding}>
                        <Typography
                            variant="h2"
                            className={classes.pageTitle}>
                            SETTINGS
                        </Typography>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center">
                            <Paper className={classes.paper}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    className={classes.pagePadding}>
                                    <Typography
                                        variant="h4"
                                        className={classes.itemTitle}>
                                        User Info
                                    </Typography>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="flex-start"
                                        style={{ paddingTop: 10 }}
                                    >
                                        <Typography
                                            variant="h5"
                                            style={{fontWeight: "bold", color: grey[800]}}>
                                            Email
                                        </Typography>
                                        <Grid
                                            container
                                            style={{ width: "40%" }}
                                        />
                                        <Typography
                                            variant="h5">
                                            test@test.com
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper className={classes.paper}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    className={classes.pagePadding}>
                                    <Typography
                                        variant="h4"
                                        className={classes.itemTitle}>
                                        Change password
                                    </Typography>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        style={{ paddingTop: 10}}
                                    >
                                    <FormControl style={{ marginRight: 20 }} required>
                                        <InputLabel htmlFor="password"
                                            className={classes.inputFontSize}>Password</InputLabel>
                                        <Input
                                            id="password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={this.handleInputFieldChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => { this.handleClickShowPassword('showPassword') }}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            className={classes.inputFontSize}
                                        />
                                    </FormControl>
                                        <FormControl style={{ marginRight: 40 }} required>
                                        <InputLabel htmlFor="confirm-passsword"
                                            className={classes.inputFontSize}>Confirm Password</InputLabel>
                                        <Input
                                            id="confirm-passsword"
                                            type={this.state.showConfirmPassword ? 'text' : 'password'}
                                            value={this.state.confirmPassword}
                                            onChange={this.handleInputFieldChange('confirmPassword')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle confirm password visibility"
                                                        onClick={() => { this.handleClickShowPassword('showConfirmPassword') }}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            className={classes.inputFontSize}
                                        />
                                        </FormControl>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{ fontSize: 12}}>
                                            Change password
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        )
    }

}

export default withStyles(styles)(SettingsPage);