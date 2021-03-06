import {
    FETCH_CURRENT_USER,
    GET_CHECK_REGISTERED,
    FINISH_REGISTRATION,
    UPDATE_PASSWORD_FINISHED,
    UPDATE_PASSWORD_STARTED
} from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";


export const fetchCurrentUser = (accessToken) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/users/current`, config)
        .then(userResponse => {
            const user = userResponse.data;
            dispatch({
                type: FETCH_CURRENT_USER,
                payload: user
            })
        });
}
export const getCheckRegistered = (registrationToken) => {
    var wrapper = {
        RegistrationToken: registrationToken
    }
    console.log("getting request");
    return async function (dispatch) {
        let errorHandled = false;
        // TODO: add error handling
        dispatch({
            type: GET_CHECK_REGISTERED,
        });
        try {
            let getResponse = null;
            await axios.post(baseApiUrl + `/api/users/regToken`, wrapper)
                .then(userResponse => {
                    getResponse = userResponse;
                }).catch(error => {
                    const resp = error;
                    errorHandled = true;
                    console.log("error");
                    console.log(error.status);
                    console.log(error.response);
                    if (typeof error.response.data !== 'undefined') {
                        dispatch(
                            loadRequestError({
                                status: error.response.status,
                                message: error.response.data[0].Message
                            }, GET_CHECK_REGISTERED));
                    }
                    else if (typeof error.response !== 'undefined') {
                        dispatch(
                            loadRequestError({
                                status: resp.status,
                                message: resp.data.error
                            }, GET_CHECK_REGISTERED));
                    }
                    else {
                        dispatch(
                            loadRequestError({
                                status: 400,
                                message: 'No connection with server!'
                            }, GET_CHECK_REGISTERED));
                    }
                });
            console.log(getResponse);
            if (getResponse.status == 200) {
                // check if the internal status is ok
                // then pass on the data
                dispatch(loadRequestSuccess(getResponse, GET_CHECK_REGISTERED));
            } else {
                // if internally there are errors
                // pass on the error, in a correct implementation
                // such errors should throw an HTTP 4xx or 5xx error
                // so that it directs straight to the catch block
                dispatch(loadRequestError(getResponse.error, GET_CHECK_REGISTERED));
            }
        } catch (error) {
            if (!errorHandled) {
                dispatch(
                    loadRequestError({
                        status: "404",
                        message: "Undefined error"
                    }), GET_CHECK_REGISTERED);
            }
        }
    }
}
export const finishRegistration = (password, registrationToken) =>{
    var regCredentials = {
        PlainPassword: password,
        RegistrationToken: registrationToken
    }
    console.log("getting request");
    return async function (dispatch) {
        let errorHandled = false;
        // TODO: add error handling
        dispatch({
            type: GET_CHECK_REGISTERED,
        });
        try {
            let patchResponse = null;
            await axios.patch(baseApiUrl + `/api/users/finishReg`, regCredentials)
                .then(userResponse => {
                    patchResponse = userResponse;
                }).catch(error => {
                    const resp = error;
                    errorHandled = true;
                    console.log("error");
                    console.log(error.response);
                    if (typeof error.response.data !== 'undefined') {
                        dispatch(
                            loadRequestError({
                                status: error.response.status,
                                message: error.response.data[0].Message
                            }, FINISH_REGISTRATION));
                    }
                    else if (typeof error.response !== 'undefined') {
                        dispatch(
                            loadRequestError({
                                status: resp.status,
                                message: resp.data.error
                            }, FINISH_REGISTRATION));
                    }
                    else {
                        dispatch(
                            loadRequestError({
                                status: 400,
                                message: 'No connection with server!'
                            }, FINISH_REGISTRATION));
                    }
                });
            console.log(patchResponse);
            if (patchResponse.status == 200) {
                // check if the internal status is ok
                // then pass on the data
                dispatch(loadRequestSuccess(patchResponse, FINISH_REGISTRATION));
            } else {
                // if internally there are errors
                // pass on the error, in a correct implementation
                // such errors should throw an HTTP 4xx or 5xx error
                // so that it directs straight to the catch block
                dispatch(loadRequestError(patchResponse.error, FINISH_REGISTRATION));
            }
        } catch (error) {
            if (!errorHandled) {
                dispatch(
                    loadRequestError({
                        status: "404",
                        message: "Undefined error"
                    }), FINISH_REGISTRATION);
            }
        }
    };
}

export function loadRequestSuccess(results, type) {
    const data = results.data;

    return {
        type: type,
        payload: data,
        error: null
    }
}

export function loadRequestError(error, type) {
    console.log(error);
    return {
        type: type,
        payload: null,
        error: error
    }
}
export const changePassword = (accessToken, changePasswordData) => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }
    let data = {
        OldPassword: changePasswordData.oldPassword,
        NewPassword: changePasswordData.newPassword
    }
    console.log("changePassword started")

    return async function (dispatch) {
        let errorHandled = false;
        dispatch({
            type: UPDATE_PASSWORD_STARTED,
            payload: null
        });
        try {
            await axios.patch(baseApiUrl + `/api/users/changePassword`, data, config)
                .then(changePasswordResponse => {
                    let response = changePasswordResponse;
                    if (response.status == 204) {
                        dispatch({
                            type: UPDATE_PASSWORD_FINISHED,
                            payload: null,
                            error: null
                        })
                    }
                    else {
                        errorHandled = true;

                        dispatch({
                            type: UPDATE_PASSWORD_FINISHED,
                            payload: null,
                            error: response.error
                        })
                    }
                }).catch(error => {
                    let changePasswordError = error;

                    if (typeof changePasswordError.response.data !== 'undefined' && !errorHandled) {
                        let errorData = {
                            status: error.response.status,
                            message: error.response.data[0].Message
                        }
                        errorHandled = true
                        dispatch({
                            type: UPDATE_PASSWORD_FINISHED,
                            payload: null,
                            error: errorData
                        })
                    }
                    else if (typeof changePasswordError.response !== 'undefined') {
                        let errorData = {
                            status: changePasswordError.status,
                            message: changePasswordError.data.error
                        }
                        errorHandled = true
                        dispatch({
                            type: UPDATE_PASSWORD_FINISHED,
                            payload: null,
                            error: errorData
                        })
                    }
                    else {
                        let errorData = {
                            status: 400,
                            message: 'No connection with server!'
                        }
                        errorHandled = true
                        dispatch({
                            type: UPDATE_PASSWORD_FINISHED,
                            payload: null,
                            error: errorData
                        })
                    }
                });
        } catch (error) {
            if (!errorHandled) {
                let errorData = {
                    status: "404",
                    message: "Undefined error"
                }
                dispatch({
                    type: UPDATE_PASSWORD_FINISHED,
                    payload: null,
                    error: errorData
                })
            }
        }


    }
}