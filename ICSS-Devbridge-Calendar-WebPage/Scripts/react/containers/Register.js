﻿
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

//Components
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Colors
import { green, purple } from '@material-ui/core/colors';

//Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//Styles(Css)
const styles = theme => ({
    background_Image: {
        display: "flex",
        flexWrap: "wrap",
        backgroundImage: "linear-gradient( rgba(51, 51, 51, 0.45), rgba(51, 51, 51, 0.45) ), url('../../../Assets/conference.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        padding: '35px',
        minHeight: '700px'
    },
    allHeader: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap'
    },
    logo: {
        backgroundImage: "url('../../../Assets/devbridgeLogo.png')",
        backgroundSize: '70px 70px',
        height: '70px',
        width: '70px',
        backgroundRepeat: 'no-repeat'
    },
    header: {
        marginLeft: "-35px",
        width: "100%",
        position: "absolute",
        fontSize: '45px',
        color: '#FF004D',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    loginBox: {
        backgroundColor: '#ffffff',
        height: '630px',
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
            name: "",
            surname: "",
            role: "",
            password: "",
            repeatPassword: "",
            checkedRememberMe: true,
            registered: false,
            openErrorSnackbar: false,
            openSuccessSnackbar: false,
            errorMessage: ""
        };
        console.log(props);
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



    handleRegisterButtonClick = (evt) => {
        this.setState({ openSuccessSnackbar: true });
        this.props.history.push('/Main/Home')
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.registerElements}>
                <div className={classes.loginBoxLabel}>
                    Create account
                </div>
                <div className={classes.formControl}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon className={classes.textBoxIcon} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="input-email-with-icon"
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
                                onChange={this.handleChange}
                                className={classes.inputTextBox} />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.formControl}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon className={classes.textBoxIcon} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="input-password-with-icon"
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
                                name="repeatPassword"
                                type="repeatPassword"
                                onChange={this.handleChange}
                                className={classes.inputTextBox} />
                        </Grid>
                    </Grid>
                </div>
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
                    <Button variant="contained" color="primary" className={classes.registerButton} onClick={this.handleRegisterButtonClick}>

                            Register
                       </Button>
                </ThemeProvider>
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
        console.log(props);
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
                    You have already registered!
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
            email: "",
            password: "",
            repeatPassword:"",
            checkedRememberMe: true,
            registered: true,
            
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
            <div className={classes.background_Image}>
                <div className={classes.allHeader}>
                    <div className={classes.logo} />
                    <div className={classes.header}>LEARNING CALENDAR</div>
                </div>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed>
                        <Typography component="div" className={classes.loginBox}>
                            {!this.state.registered ? <RegisterWithPassword classes={classes} /> : null}
                            {this.state.registered ? <Registered classes={classes} /> : null}
                        </Typography>
                    </Container>
                </React.Fragment>
                
            </div>
        );
    }
}

export default withStyles(styles)(Register);