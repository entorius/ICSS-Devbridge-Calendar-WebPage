import { FETCH_EMPLOYEES_BY_TOPIC, FETCH_TEAMS_BY_TOPIC } from "../actions/types";

const initialState = {
    employeesByTopic: [],
    teamsByTopic: []
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
        default:
            return state;
    }
}