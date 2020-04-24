import React, { Component } from 'react';
import Application from "./Application";
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../react/redux/store"

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <Application />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
