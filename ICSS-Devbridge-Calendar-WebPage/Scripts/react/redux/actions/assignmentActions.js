import { FETCH_ASSIGNMENTS, NEW_ASSIGNMENT } from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";


export const fetchAssignments = (accessToken) => dispatch => {
    console.log(baseApiUrl); 

    const config = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }

    //connectionString - variable in web.config describing server route( in our case e.t.c https://localhost:44374/)
    axios.get(baseApiUrl + `/api/assignments`, config)
        .then(assignments => {
            const jsonAssignments = assignments.data;
            dispatch({
                type: FETCH_ASSIGNMENTS,
                payload: jsonAssignments
            })
        });
}