import React, { Component } from 'react';
import Application from "./Application";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";



ReactDOM.render(
    <BrowserRouter history={history}>
        <Application />
    </BrowserRouter>,
    document.getElementById('root')
);
