import { LOGIN } from './types';
import { baseApiUrl } from '../config';
import axios from 'axios';


export const getToken = (userData) => dispatch => {
    var data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', userData.username);
    data.append('password', userData.password);

    // TODO: add error handling

    return axios.post(baseApiUrl + `/token`, data)
        .then(response => {
            const token = response.data.access_token;
            dispatch({
                type: LOGIN,
                payload: { accessToken: token }
            });
        });
}