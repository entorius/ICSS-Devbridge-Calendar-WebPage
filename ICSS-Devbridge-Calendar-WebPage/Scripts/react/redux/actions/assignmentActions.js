import { FETCH_ASSIGNMENTS, FETCH_TEAM_ASSIGNMENTS } from "./types";
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

export const postNewAssignment = (accessToken, assignmentData) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }

    const data = {
        UserId: assignmentData.userId,
        TopicId: assignmentData.topicId,
        Comments: assignmentData.comments,
        Date: assignmentData.date,
        StateId: 1
    }

    return axios.post(baseApiUrl + `/api/assignments`, data, config);
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