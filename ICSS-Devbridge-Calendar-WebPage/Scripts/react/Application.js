import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Home from "./containers/Home";
import Login from "./containers/Login";
import Team from "./containers/Team";
import CalendarPage from "./containers/CalendarPage";
import Topics from "./containers/Topics";
import LearningTree from "./containers/LearningTree";
import Register from "./containers/Register";
import SettingsPage from "./containers/SettingsPage";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

const styles = theme => ({
    main_div: {
        height: '100%',
    }
});

class Application extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.main_div}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Home/Register" component={Register} />
                    <PrivateRoute exact path="/Main/Home" component={Home} />
                    <PrivateRoute exact path="/Main/Calendar" component={CalendarPage} />
                    <PrivateRoute exact path="/Main/LearningTree" component={LearningTree} />
                    <PrivateRoute exact path="/Main/Settings" component={SettingsPage} />
                    <PrivateRoute exact path="/Main/Team" component={Team} />
                    <PrivateRoute exact path="/Main/Topics" component={Topics} />
                </Switch>
            </div>
        );
    }
}

export default withStyles(styles)(Application);