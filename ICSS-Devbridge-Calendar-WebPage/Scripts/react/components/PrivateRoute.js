import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = localStorage.token !== undefined;

    return (
        <Route
            {...rest}
            render={props =>
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/' }} />
            )
            }
        />
    )
}

export default PrivateRoute