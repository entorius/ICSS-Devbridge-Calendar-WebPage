import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { green, blue, grey, indigo } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SideBar from "../components/SideBar";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
    },
    alert: {
        "& .MuiAlert-icon": {
            fontSize: 25
        },
        "& .MuiAlert-message": {
            fontSize: 15
        }
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
            confirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
            error: false,
            errorMessage: " ",
            showAlertSuccess: false
        }
    }

    changePasswordValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Please enter your first name'),
        confirmPassword: Yup.string()
            .required('Please enter a last name')
    });

    handleInputFieldChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
        if (name == 'confirmPassword') {
            if (this.state.password == event.target.value) {
                this.setState({ errorMessage: " ", error: false });
            }
            else {
                this.setState({ errorMessage: "passwords do not match", error: true });
            }
        }

    };

    handleClickShowPassword = (name) => {
        this.setState(prevState => ({
            [name]: !prevState[name]
        }))
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleShowAlert = () => {
        this.setState(prevState => ({ showAlertSuccess: !prevState.showAlertSuccess }))
    }

    onSubmit = values => {
        this.handleShowAlert()
    }

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
                                    <Formik
                                        initialValues={{ password: '', confirmPassword: '' }}
                                        onSubmit={this.onSubmit}
                                        validationSchema={Yup.object().shape({
                                            password: Yup.string()
                                                .required('This field is required')
                                                .min(7, "Password must contain at least 7 characters"),
                                            confirmPassword: Yup.string()
                                                .required('This field is required')
                                                .oneOf([Yup.ref('password'), null], 'Passwords do not match')
                                        })}
                                        >
                                            {({
                                                handleSubmit,
                                                values,
                                                touched,
                                                errors,
                                                handleChange,
                                                handleBlur
                                            }) => (
                                                 <form>
                                                        <FormControl style={{ marginRight: 20 }}
                                                            required
                                                            error={touched.password && Boolean(errors.password)}>
                                                        <InputLabel htmlFor="password"
                                                            className={classes.inputFontSize}>Password</InputLabel>
                                                        <Input
                                                            id="password"
                                                            name="password"
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
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
                                                            aria-describedby="password-error"
                                                        />
                                                            <FormHelperText id="password-error" style={{ fontSize: 12 }}>
                                                                {touched.password ? errors.password : ""}
                                                            </FormHelperText>
                                                    </FormControl>
                                                    <FormControl
                                                            style={{ marginRight: 40 }}
                                                            required
                                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}>
                                                        <InputLabel htmlFor="confirm-passsword"
                                                            className={classes.inputFontSize}>Confirm Password</InputLabel>
                                                        <Input
                                                            id="confirm-passsword"
                                                            name="confirmPassword"
                                                            type={this.state.showConfirmPassword ? 'text' : 'password'}
                                                            value={values.confirmPassword}
                                                            helperText={this.state.errorMessage}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
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
                                                            aria-describedby="confirm-password-error"
                                                        />
                                                        <FormHelperText id="confirm-password-error" style={{ fontSize: 12 }}>
                                                                {touched.confirmPassword ? errors.confirmPassword : ""}
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <Button
                                                        onClick={handleSubmit}
                                                        style={{ fontSize: 12 }}>
                                                        Change Password
                                                    </Button>
                                                </form>
                                                )
                                            }
                                        </Formik>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Snackbar open={this.state.showAlertSuccess} autoHideDuration={3000} onClose={this.handleShowAlert}>
                            <MuiAlert
                                elevation={6}
                                variant="filled"
                                onClose={this.handleShowAlert}
                                severity="success"
                                className={classes.alert}>
                                Password successfuly changed
                            </MuiAlert>
                        </Snackbar>
                    </Grid>
                </div>
            </MuiThemeProvider>
        )
    }

}

export default withStyles(styles)(SettingsPage);