
//React components
import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Styles providers
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

//Containers/Forms
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

//Components
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Colors
import { green, purple } from '@material-ui/core/colors';

//Icons
import LockIcon from '@material-ui/icons/Lock';
//Redux
import { getCheckRegistered, finishRegistration } from '../redux/actions/userActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Yup and fomik
import { Formik } from 'formik';
import * as Yup from 'yup';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//Styles(Css)
const styles = theme => ({
    background_Image: {
        backgroundImage: "linear-gradient( rgba(51, 51, 51, 0.45), rgba(51, 51, 51, 0.45) ), url('../../../Assets/conference.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        padding: '35px',
        minHeight: '700px'
    },
    allHeader: {
        width: '100%',
    },
    logo: {
        backgroundImage: "url('../../../Assets/devbridgeLogo.png')",
        backgroundSize: '70px 70px',
        height: '70px',
        width: '70px',
        backgroundRepeat: 'no-repeat'
    },
    header: {
        width: "100%",
        fontSize: '45px',
        color: '#FF004D',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    loginBox: {
        backgroundColor: '#ffffff',
        height: '430px',
        width: '450px',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: '#FF004D',
        marginTop: '10px'
    },
    /*Register with password styles*/
    registerElements: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: '2px',
        display: 'flex',
        alignSelf: 'center',
        marginTop: '25px'
    },
    loginBoxLabel: {
        fontSize: '30px',
        textAlign: 'center',
        width: '100%',
        marginTop: '10px'
    },
    resize: {
        fontSize: '20px'
    },
    resizeCheckbox: {
        fontSize: '15px'
    },

    inputTextBox: {
        width: '300px',
        fontSize: '20px'
    },
    checkBoxRememberMe: {
        marginTop: '15px',
        marginLeft: '50px',
        fontSize: '20px'
    },
    registerButton: {
        display: 'flex',
        marginTop: '20px',
        alignSelf: 'center',
        width: '300px',
        height: '40px',
        color: 'white !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    loginLink: {

        color: 'blue !important',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '12px',
    },

    textBoxIcon: {
        fontSize: '25px'
    },
    /*Registered styles*/
    registeredBoxLabel: {
        fontSize: '20px',
        width: '100%',
        marginTop: '10px'
    },
    loginLinkRegistered: {
        color: 'blue !important',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        fontSize: '14px',
    },
    registrationField: {
        display: 'flex',
        justifyContent: 'center'
    }
});
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

class RegisterWithPassword extends React.Component {
    constructor(props) {
        super(props);
        {/*TODO: state parameters for login: email and password*/ }
        this.state = {
            registrationToken: "",
            password: "",
            repeatPassword: "",
            checkedRememberMe: true,
            registered: false,
            openErrorSnackbar: false,
            openSuccessSnackbar: false,
            errorMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleErrorSnackBarClose = this.handleErrorSnackBarClose.bind(this);
        this.handleSuccessSnackBarClose = this.handleSuccessSnackBarClose.bind(this);
    }
    handleChange(evt) {

        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleCheckboxChange(event) {

        this.setState({ checkedRememberMe: event.target.checked });
    }
    handleErrorSnackBarClose = (evt) => {
        this.setState({ openErrorSnackbar: false });
    }
    handleSuccessSnackBarClose = (evt) => {
        this.setState({ openSuccessSnackbar: false });
    }
    componentDidUpdate(prevProps) {
        if (this.props.registrationToken !== prevProps.registrationToken) {
            this.setState({ registrationToken: this.props.registrationToken });
        }
    }


    handleRegisterButtonClick = async (values, { resetForm }) => {
        await this.props.allProps.finishRegistration(values.password, this.props.registrationToken);
        this.props.allProps.history.push('/');

    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.registerElements}>
                <div className={classes.loginBoxLabel}>
                    Create account
                </div>
                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    onSubmit={this.handleRegisterButtonClick}
                    validationSchema={Yup.object().shape({
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
                                <FormControl className={classes.formControl}
                                    required
                                    error={touched.password && Boolean(errors.password)}>
                                    <Grid container spacing={1} alignItems="flex-end" className={classes.registrationField}>
                                        <Grid item>
                                            <LockIcon className={classes.textBoxIcon} />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="password"
                                                value={values.password}
                                                helperText={this.state.errorMessage}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.resize,
                                                    },
                                                }}
                                                InputLabelProps={{
                                                    classes: {
                                                        root: classes.resize
                                                    }
                                                }}
                                                label="Password"
                                                type="password"
                                                name="password"
                                                className={classes.inputTextBox} />
                                        </Grid>
                                    </Grid>
                                    <FormHelperText id="password-error" style={{ fontSize: 12, textAlign: "center" }}>
                                        {touched.password ? errors.password : ""}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl className={classes.formControl}
                                    required
                                    error={touched.password && Boolean(errors.password)}>
                                    <Grid container spacing={1} alignItems="flex-end" className={classes.registrationField}>
                                        <Grid item>
                                            <LockIcon className={classes.textBoxIcon} />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="confirm-passsword"
                                                value={values.confirmPassword}
                                                helperText={this.state.errorMessage}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.resize,
                                                    },
                                                }}
                                                InputLabelProps={{
                                                    classes: {
                                                        root: classes.resize
                                                    }
                                                }}
                                                label="Repeat Password"
                                                name="confirmPassword"
                                                type="password"
                                                className={classes.inputTextBox} />
                                        </Grid>
                                    </Grid>
                                    <FormHelperText id="confirm-password-error" style={{ fontSize: 12, textAlign: "center" }}>
                                        {touched.confirmPassword ? errors.confirmPassword : ""}
                                    </FormHelperText>
                                </FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.checkedRememberMe}
                                            onChange={this.handleCheckboxChange}
                                            name="checkedRememberMe"
                                            color="primary"
                                        />
                                    }
                                    label=" Agree with terms and policies"
                                    className={classes.checkBoxRememberMe}
                                />
                                <ThemeProvider theme={theme}>
                                    {/* TODO: add action to register User (add password to database)*/}
                                    <Button variant="contained" color="primary" className={classes.registerButton} onClick={handleSubmit}>

                                        Register
                                    </Button>
                                </ThemeProvider>
                            </form>
                        )
                    }
                </Formik>
                <ThemeProvider theme={theme}>
                    <Link to="/">
                        <div className={classes.loginLink}>
                            go to Login
                        </div>
                    </Link>
                </ThemeProvider>
                <Snackbar open={this.state.openSuccessSnackbar} autoHideDuration={6000} name="openSuccessSnackbar" onClose={this.handleSuccessSnackBarClose} >
                    <Alert onClose={this.handleSuccessSnackBarClose} name="openSuccessSnackbar" severity="success">
                        You have succesfully registered!
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.openErrorSnackbar} autoHideDuration={6000} name="openErrorSnackbar" onClose={this.handleErrorSnackBarClose}>
                    <Alert onClose={this.handleErrorSnackBarClose} name="openErrorSnackbar" severity="error">
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}
class Registered extends React.Component {
    constructor(props) {
        super(props);
        {/*TODO: state parameters for login: email and password*/ }
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleChange(evt) {

        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleCheckboxChange(event) {

        this.setState({ checkedRememberMe: event.target.checked });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.registeredElements}>
                <div className={classes.registeredBoxLabel}>
                    You have already registered or do not have permission to this page!
                    </div>

                <ThemeProvider theme={theme}>
                    <Link to="/">

                        <div className={classes.loginLinkRegistered}>
                            go to Login
                        </div>
                    </Link>
                </ThemeProvider>
            </div>
        );
    }
}


class Register extends React.Component {
    constructor(props) {
        super(props);
        {/*TODO: when loading get state if user registered and user itself and his email*/ }
        this.state = {
            registrationToken: "",
            password: "",
            repeatPassword: "",
            checkedRememberMe: true,
            registered: true,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    async componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const registrationToken = params.get('registrationToken');
        registrationToken !== null ? this.setState({ registered: false }) : this.setState({ registered: true });
        this.setState({ registrationToken: registrationToken });
        registrationToken !== null ? await this.props.getCheckRegistered(registrationToken) : null;
        this.props.users.isRegistered !== null ?
            this.setState({ registered: false }) : this.setState({ registered: true });

        //getCheckRegistered()
        //finishRegistration
    }

    handleChange(evt) {

        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleCheckboxChange(event) {

        this.setState({ checkedRememberMe: event.target.checked });
    }
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.background_Image}>
                <div className={classes.allHeader}>
                    <div className={classes.logo} />
                    <div className={classes.header}>LEARNING CALENDAR</div>
                </div>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed>
                        <Typography component="div" className={classes.loginBox}>
                            {!this.state.registered ? <RegisterWithPassword classes={classes} allProps={this.props} registrationToken={this.state.registrationToken} /> : null}
                            {this.state.registered ? <Registered classes={classes} /> : null}
                        </Typography>
                    </Container>
                </React.Fragment>

            </div>
        );
    }
}
Register.propTypes = {
    getCheckRegistered: PropTypes.func.isRequired,
    finishRegistration: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    users: state.users,
})

export default connect(mapStateToProps, { getCheckRegistered, finishRegistration })(withStyles(styles)(Register));