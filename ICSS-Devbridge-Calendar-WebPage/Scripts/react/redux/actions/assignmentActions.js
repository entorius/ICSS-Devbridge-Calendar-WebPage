import { FETCH_ASSIGNMENTS, FETCH_TEAM_ASSIGNMENTS, NEW_ASSIGNMENT } from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";


export const fetchAssignments = (accessToken) => dispatch => {

    const config = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }

    return axios.get(baseApiUrl + `/api/assignments`, config)
        .then(assignments => {
            const jsonAssignments = assignments.data;
            dispatch({
                type: FETCH_ASSIGNMENTS,
                payload: jsonAssignments
            })
        });
}

export const fetchSubordinateAssignments = (accessToken) => dispatch => {

    const config = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }

    return axios.get(baseApiUrl + `/api/assignments/manager`, config)
        .then(assignments => {
            const jsonAssignments = assignments.data;
            dispatch({
                type: FETCH_TEAM_ASSIGNMENTS,
                payload: jsonAssignments
            })
        });
}

export const postNewAssignment = (accessToken, assignmentData) =>{
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    const data = {
        UserId: assignmentData.userId,
        TopicId: assignmentData.topicId,
        Comments: assignmentData.comments,
        Date: assignmentData.date,
        StateId: 1
    }
    return async function (dispatch) {
        let errorHandled = false;
        // TODO: add error handling
        dispatch({
            type: NEW_ASSIGNMENT,
        });
        try {
            let postResponse = null;

            await axios.post(baseApiUrl + `/api/assignments`, data, config)
                .then(response => {
                    postResponse = response;
                }).catch(error => {
                    const resp = error.response;
                    errorHandled = true;
                    console.log(resp);
                    if (typeof error.response !== 'undefined') {
                        dispatch(
                            loadRequestError({
                                status: resp.status,
                                message: resp.data[0].Message
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

export const updateAssignment = (accessToken, assignmentData) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }

    const data = {
        TopicId: assignmentData.topicId,
        Comments: assignmentData.comments,
        Date: assignmentData.date
    }

    return axios.patch(baseApiUrl + `/api/assignments/${assignmentData.id}`, data, config);
}

export function loadRequestSuccess(results) {
    return {
        type: NEW_ASSIGNMENT,
        payload: results,
        error: null
    }
}

export function loadRequestError(error) {
    return {
        type: NEW_ASSIGNMENT,
        payload: null,
        error: error
    }
}