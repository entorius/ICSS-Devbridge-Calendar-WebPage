import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import SideBar from "./components/SideBar";
import Home from "./components/Home";
import Directory from "./components/Directory";
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
                        <Route exact path="/" component={Home} />
                        <Route exact path="/Directory" exact component={Directory} />
                    </Switch>
                
            </div>
        );
    }
}

export default Application;