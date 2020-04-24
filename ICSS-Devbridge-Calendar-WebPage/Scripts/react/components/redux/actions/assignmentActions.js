import { FETCH_POSTS, NEW_POST } from "./types";
import { connectionString } from "../connectionStrings";
import axios from "axios";


export const fetchAssignments = () => dispatch => {
    console.log(connectionString);
    //connectionString - variable in web.config describing server route( in our case e.t.c https://localhost:44374/)
    axios.get(connectionString + `/api/assignments`)
        .then(assignments => {
            const jsonAssignments = assignments.data;
            dispatch({
                type: FETCH_POSTS,
                payload: jsonAssignments
            })
        });
}