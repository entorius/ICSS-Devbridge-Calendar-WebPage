//Jquery
import $ from 'jquery';
import { setExpirationTime, checkIfDelete, Delete} from "../functions/LocalStorageFunctions";
//React components
import React, { Component } from 'react';
import { Link, useHistory } from "react-router-dom";

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '../redux/actions/loginActions';

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
    logo: {
        backgroundImage: "url('../../../Assets/devbridgeLogo.png')",
        backgroundSize: '70px 70px',
        height: '70px',
        width: '70px',
        backgroundRepeat: 'no-repeat'
    },
    header: {
        fontSize: '45px',
        color: '#FF004D',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    loginBox: {
        backgroundColor: '#ffffff',
        height: '400px',
        width: '450px',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: '#FF004D',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: '10px'
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
    loginButton: {
        display: 'flex',
        marginTop: '20px',
        alignSelf: 'center',
        width: '300px',
        height: '40px',
        color: 'white !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    textBoxIcon: {
        fontSize:'25px'
    },
    registerLink: {
        color: 'blue !important',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '12px',
    },

});
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});


class Login extends React.Component {
    constructor(props) {
        super(props);
        {/*TODO: state parameters for login: email and password*/ }
        this.state = {
            email: "",
            password:"",
            checkedRememberMe: true,
            errorMessage: "",
            openSuccessSnackbar: false,
            openErrorSnackbar: false,
            signInDisabled: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleErrorSnackBarClose = this.handleErrorSnackBarClose.bind(this);
        this.handleSuccessSnackBarClose = this.handleSuccessSnackBarClose.bind(this);
    }
    componentDidMount() {
        var isLoggedIn = localStorage.token !== undefined;
        isLoggedIn ? checkIfDelete() : null;
        isLoggedIn = localStorage.token !== undefined;
        isLoggedIn ? this.props.history.push('/Main/Home') : null;
    }
    handleChange(evt) {
        
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleCheckboxChange(event) {
        
        this.setState({ checkedRememberMe: event.target.checked });
    }

    async handleSignInClick(event) {
        const userData = {
            username: this.state.email,
            password: this.state.password
        }

        $("html").attr("style", "cursor: progress !important");
        this.setState({ signInDisabled: true });
        await this.props.getToken(userData);
        $("html").attr("style", "cursor: default !important");
        this.setState({ signInDisabled: false });
        if (this.props.login.error != null) {
            this.setState({
                openErrorSnackbar: true,
                errorMessage:this.props.login.error.message
            })
        }
        else {
            this.props.history.push('/Main/Home')
        }
       
    }
    handleErrorSnackBarClose(evt) {
        this.setState({ openErrorSnackbar : false });
    }
    handleSuccessSnackBarClose(evt) {
        this.setState({ openSuccessSnackbar: false });
    }
    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.background_Image}>
                <div className={classes.logo} />
                <div className={classes.header}>LEARNING CALENDAR</div>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed>
                        <Typography component="div" className={classes.loginBox}>
                            <div className={classes.loginBoxLabel}>
                                Login
                            </div>
                            <div className={classes.formControl}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle
                                            className={classes.textBoxIcon}/>
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
                                            label="Email"
                                            name="email"
                                            onChange={this.handleChange}
                                            className={classes.inputTextBox} />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.formControl}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <LockIcon className={classes.textBoxIcon}/>
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
                                            label="Password"
                                            name="password"
                                            type="password"
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
                                label="Remember me"
                                className={classes.checkBoxRememberMe}
                            />
                            <ThemeProvider theme={theme}>
                                {/* <Link to="/Main/Home"> */}
                                    {/*TODO: add ajax request for login button*/}
                                <Button variant="contained" color="primary" className={classes.loginButton} onClick={this.handleSignInClick} disabled={this.state.signInDisabled}>
                                        
                                            Sign in
                                    </Button>
                                {/* </Link> */}
                            </ThemeProvider>
                        </Typography>
                    </Container>
                </React.Fragment>

                <Snackbar open={this.state.openSuccessSnackbar} autoHideDuration={6000} name="openSuccessSnackbar" onClose={this.handleSuccessSnackBarClose} >
                    <Alert onClose={this.handleSuccessSnackBarClose} name="openSuccessSnackbar" severity="success">
                        This is a success message!
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

Login.propTypes = {
    getToken: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    login: state.login
})

export default connect(mapStateToProps, { getToken })(withStyles(styles)(Login));