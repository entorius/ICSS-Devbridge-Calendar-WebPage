import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Home from "./containers/Home";
import Login from "./containers/Login";
import Team from "./containers/Team";
import CalendarPage from "./containers/CalendarPage";
import LearningTree from "./containers/LearningTree";
import Register from "./containers/Register";
import { Switch, Route } from "react-router-dom";

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
                    <Route exact path="/Main/Home" component={Home} />
                    <Route exact path="/Main/Calendar" component={CalendarPage} />
                    <Route exact path="/Main/LearningTree" component={LearningTree} />
                    <Route exact path="/Main/Settings" component={Home} />
                    <Route exact path="/Main/Team" component={Team} />
                    <Route exact path="/Main/Topics" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default withStyles(styles)(Application);