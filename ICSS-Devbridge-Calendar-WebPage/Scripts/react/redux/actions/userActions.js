import { FETCH_CURRENT_USER } from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";


export const fetchCurrentUser = (accessToken) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}`}
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