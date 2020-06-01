import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { blue, grey, indigo } from '@material-ui/core/colors';
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
import { checkIfRedirectToLoginPage } from '../functions/LocalStorageFunctions';

import { changePassword, fetchCurrentUser } from '../redux/actions/userActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        width: "75%"
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
            showOldPassword: false,
            showAlert: false,
            alertMessage: "",
            error: false
        }
    }

    componentDidMount() {
        checkIfRedirectToLoginPage(this.props);
    }

    handleClickShowPassword = (name) => {
        this.setState(prevState => ({
            [name]: !prevState[name]
        }))
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleShowAlert = () => {
        this.setState(prevState => ({ showAlert: !prevState.showAlert }))
    }

    onSubmit = async (values) => {
        let data = {
            oldPassword: values.oldPassword,
            newPassword: values.password
        }
        console.log("calling request: " + data.oldPassword + " " + data.newPassword)
        await this.props.changePassword(this.props.token.accessToken, data)

        if (!this.props.isLoading && this.props.error == null) {
            this.setState({ alertMessage: "Password successfuly changed", error: false })
            this.handleShowAlert()
            localStorage.removeItem("expirationTime")
            localStorage.removeItem("token")
            this.props.history.push('/');
        }
        else if (!this.props.isLoading && this.props.error != null) {
            this.setState({ alertMessage: this.props.error.message, error: true })
            this.handleShowAlert()
        }
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
                                        Change password
                                    </Typography>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                        style={{ paddingTop: 10 }}
                                    >
                                        <Formik
                                            initialValues={{ oldpassword: '', password: '', confirmPassword: '' }}
                                            onSubmit={this.onSubmit}
                                            validationSchema={Yup.object().shape({
                                                oldPassword: Yup.string()
                                                    .required('This field is required'),
                                                password: Yup.string()
                                                    .required('This field is required')
                                                    .min(8, "Password must contain at least 8 characters")
                                                    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/, { message: "Password must contain at least 1 letter, 1 number and 1 special character" }),
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
                                                            error={touched.oldPassword && Boolean(errors.oldPassword)}>
                                                            <InputLabel htmlFor="oldPassword"
                                                                className={classes.inputFontSize}>Current password</InputLabel>
                                                            <Input
                                                                id="oldPassword"
                                                                name="oldPassword"
                                                                options={{ autoComplete: 'off' }}
                                                                type={this.state.showOldPassword ? 'text' : 'password'}
                                                                value={values.oldPassword}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={() => { this.handleClickShowPassword('showOldPassword') }}
                                                                            onMouseDown={this.handleMouseDownPassword}
                                                                        >
                                                                            {this.state.showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                                className={classes.inputFontSize}
                                                                aria-describedby="password-error"
                                                            />
                                                            <FormHelperText id="password-error" style={{ fontSize: 12 }}>
                                                                {touched.oldPassword ? errors.oldPassword : ""}
                                                            </FormHelperText>
                                                        </FormControl>
                                                        <FormControl style={{ marginRight: 20 }}
                                                            required
                                                            error={touched.password && Boolean(errors.password)}>
                                                            <InputLabel htmlFor="password"
                                                                className={classes.inputFontSize}>New Password</InputLabel>
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
                                                                className={classes.inputFontSize}>Confirm New Password</InputLabel>
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
                                                            style={{ fontSize: 12 }}
                                                            disabled={this.props.isLoading}>
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
                        <Snackbar open={this.state.showAlert} autoHideDuration={3000} onClose={this.handleShowAlert}>
                            <MuiAlert
                                elevation={6}
                                variant="filled"
                                onClose={this.handleShowAlert}
                                severity={!this.state.error ? "success" : "error"}
                                className={classes.alert}>
                                {this.state.alertMessage}
                            </MuiAlert>
                        </Snackbar>
                    </Grid>
                </div>
            </MuiThemeProvider>
        )
    }

}

SettingsPage.propTypes = {
    changePassword: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    token: state.login.token,
    user: state.users.user,
    isLoading: state.users.isLoading,
    error: state.users.error
})

export default connect(mapStateToProps, { changePassword, fetchCurrentUser })(withStyles(styles)(SettingsPage));