import {
    FETCH_EMPLOYEES_BY_TOPIC,
    FETCH_TEAMS_BY_TOPIC,
    FETCH_LEARNT_TOPICS_BY_TEAM,
    FETCH_PLANNED_TOPICS_BY_TEAM
} from "../actions/types";

const initialState = {
    employeesByTopic: [],
    teamsByTopic: [],
    learntTopicsByTeam: [],
    plannedTopicsByTeam: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_EMPLOYEES_BY_TOPIC:
            return {
                ...state,
                employeesByTopic: action.payload
            }
        case FETCH_TEAMS_BY_TOPIC:
            return {
                ...state,
                teamsByTopic: action.payload
            }
        case FETCH_LEARNT_TOPICS_BY_TEAM:
            return {
                ...state,
                learntTopicsByTeam: action.payload
            }
        case FETCH_PLANNED_TOPICS_BY_TEAM:
            return {
                ...state,
                plannedTopicsByTeam: action.payload
            }
        default:
            return state;
    }
}