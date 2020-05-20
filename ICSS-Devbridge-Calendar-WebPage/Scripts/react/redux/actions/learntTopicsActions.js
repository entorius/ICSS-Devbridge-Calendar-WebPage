import { FETCH_EMPLOYEES_BY_TOPIC, FETCH_TEAMS_BY_TOPIC } from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";

export const fetchEmployeesByTopic = (accessToken) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics/6/usersWithPastAssignments`, config)
        .then(employeesResponse => {
            const employeesByTopic = employeesResponse.data;
            dispatch({
                type: FETCH_EMPLOYEES_BY_TOPIC,
                payload: employeesByTopic
            })
        });
}


export const fetchTeamsByTopic = (accessToken) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics/6/teamsWithPastAssignments`, config)
        .then(teamsResponse => {
            const teamsByTopic = teamsResponse.data;
            dispatch({
                type: FETCH_TEAMS_BY_TOPIC,
                payload: teamsByTopic
            })
        });
}
