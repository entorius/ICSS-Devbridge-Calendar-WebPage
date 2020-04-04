import React, { Component } from 'react';
import SideBar from "./SideBar";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <SideBar />
                <h1>This is a Home Page</h1>
            </div>
        );
    }
}

export default Home;