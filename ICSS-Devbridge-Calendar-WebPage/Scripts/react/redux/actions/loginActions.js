import { LOGIN } from './types';
import { baseApiUrl } from '../config';
import axios from 'axios';


export const getToken = (userData) =>  {
    var data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', userData.username);
    data.append('password', userData.password);
    
    return async function (dispatch) {
        let errorHandled = false;
        // TODO: add error handling
        dispatch({
            type: LOGIN,
        });
        try {
            let postResponse = null;
            await axios.post(baseApiUrl + `/token`, data)
                .then(response => {
                postResponse = response;
            }).catch(error => {
                const resp = error.response;
                errorHandled = true;
                if (typeof error.response !== 'undefined') {
                    dispatch(
                        loadRequestError({
                            status: resp.status,
                            message: resp.data.error
                        }));
                }
                else {
                    dispatch(
                        loadRequestError({
                            status: 400,
                            message: 'No connection with server!'
                        }));
                }
            });
            console.log(postResponse);
            if (postResponse.status == 200) {
                // check if the internal status is ok
                // then pass on the data
                dispatch(loadRequestSuccess(postResponse));
            } else {
                // if internally there are errors
                // pass on the error, in a correct implementation
                // such errors should throw an HTTP 4xx or 5xx error
                // so that it directs straight to the catch block
                dispatch(loadRequestError(postResponse.error));
            } 
        } catch (error) {
            if (!errorHandled) {
                dispatch(
                    loadRequestError({
                        status: "404",
                        message: "Undefined error"
                    }));
            }
        } 
    }
}

export function loadRequestSuccess(results) {
    const token = results.data.access_token;
    return {
        type: LOGIN,
        payload: { accessToken: token },
        error: null
    }
}

export function loadRequestError(error) {
    return {
        type: LOGIN,
        payload: null,
        error: error
    }
}