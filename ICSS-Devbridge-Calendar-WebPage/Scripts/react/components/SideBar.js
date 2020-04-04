import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>This is a Sidebar Component</h1>
                <Link to="/Main/Home">
                    <button>HOME</button>
                </Link>
                <Link to="/Main/Team">
                    <button>TEAM</button>
                </Link>
                <Link to="/Main/Topics">
                    <button>TOPICS</button>
                </Link>
                <Link to="/Main/Calendar">
                    <button>CALENDAR</button>
                </Link>
                <Link to="/Main/LearningTree">
                    <button>LEARNING TREE</button>
                </Link>
                <Link to="/Main/Settings">
                    <button>SETTINGS</button>
                </Link>
                <Link to="/">
                    <button>LOGOUT</button>
                </Link>
            </div>
        );
    }
}

export default SideBar;