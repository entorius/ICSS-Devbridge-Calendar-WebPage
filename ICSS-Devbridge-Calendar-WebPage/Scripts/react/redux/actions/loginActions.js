import { LOGIN } from './types';
import { connectionString } from '../connectionStrings';
import axios from 'axios';


export const getToken = (userData) => dispatch => {
    console.log('getToken')
    console.log(userData);
    var data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', userData.username);
    data.append('password', userData.password);

    axios.post(connectionString + `/token`, data)
        .then(response => {
            const token = response.data.access_token;
            console.log(token);
            dispatch({
                type: LOGIN,
                payload: { accessToken: token }
            });
        });
}