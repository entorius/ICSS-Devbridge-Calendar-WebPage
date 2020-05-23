import {
    FETCH_EMPLOYEES_BY_TOPIC,
    FETCH_TEAMS_BY_TOPIC,
    FETCH_LEARNT_TOPICS_BY_TEAM,
    FETCH_PLANNED_TOPICS_BY_TEAM
} from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";

export const fetchEmployeesByTopic = (accessToken, topicId) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics/${topicId}/usersWithPastAssignments`, config)
        .then(employeesResponse => {
            const employeesByTopic = employeesResponse.data;
            dispatch({
                type: FETCH_EMPLOYEES_BY_TOPIC,
                payload: employeesByTopic
            })
        });
}


export const fetchTeamsByTopic = (accessToken, topicId) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics/${topicId}/teamsWithPastAssignments`, config)
        .then(teamsResponse => {
            const teamsByTopic = teamsResponse.data;
            dispatch({
                type: FETCH_TEAMS_BY_TOPIC,
                payload: teamsByTopic
            })
        });
}

export const fetchLearntTopicsByTeam = (accessToken, managerId) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics/teamLearnt/${managerId}`, config)
        .then(learntTopicsResponse => {
            const learntTopicsByTeam = learntTopicsResponse.data;
            dispatch({
                type: FETCH_LEARNT_TOPICS_BY_TEAM,
                payload: learntTopicsByTeam
            })
        });
}

export const fetchPlannedTopicsByTeam = (accessToken, managerId) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics/teamPlanned/${managerId}`, config)
        .then(plannedTopicsResponse => {
            const plannedTopicsByTeam = plannedTopicsResponse.data;
            dispatch({
                type: FETCH_PLANNED_TOPICS_BY_TEAM,
                payload: plannedTopicsByTeam
            })
        });
}
