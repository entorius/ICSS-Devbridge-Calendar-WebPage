import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import SideBar from "./components/SideBar";
import Home from "./components/Home";
import Login from "./components/Login";
import { Switch, Route } from "react-router-dom";


class Application extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Welcome to our browser component new</h1>
                
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/Main/Home" component={Home} />
                        <Route exact path="/Main/Calendar" component={Home} />
                        <Route exact path="/Main/LearningTree" component={Home} />
                        <Route exact path="/Main/Settings" component={Home} />
                        <Route exact path="/Main/Team" component={Home} />
                        <Route exact path="/Main/Topics" component={Home} />
                    </Switch>
                
            </div>
        );
    }
}

export default Application;