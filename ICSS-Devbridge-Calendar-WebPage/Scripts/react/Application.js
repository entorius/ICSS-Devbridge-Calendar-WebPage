import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Home from "./containers/Home";
import Login from "./containers/Login";
import CalendarPage from "./containers/CalendarPage";
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
                    <Route exact path="/Main/Home" component={Home} />
                    <Route exact path="/Main/Calendar" component={CalendarPage} />
                    <Route exact path="/Main/LearningTree" component={Home} />
                    <Route exact path="/Main/Settings" component={Home} />
                    <Route exact path="/Main/Team" component={Home} />
                    <Route exact path="/Main/Topics" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default withStyles(styles)(Application);