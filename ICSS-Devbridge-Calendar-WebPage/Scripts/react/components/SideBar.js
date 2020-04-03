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
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/Directory">
                    <button>Directory</button>
                </Link>
            </div>
        );
    }
}

export default SideBar;