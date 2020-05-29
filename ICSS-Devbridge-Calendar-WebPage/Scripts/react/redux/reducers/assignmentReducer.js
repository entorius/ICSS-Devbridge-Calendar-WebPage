import { FETCH_ASSIGNMENTS, FETCH_TEAM_ASSIGNMENTS } from "../actions/types";

const initialState = {
    items: [],
    teamAssignments: []
}

export default function (state = initialState,action) {
    switch (action.type) {
        case FETCH_ASSIGNMENTS:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_TEAM_ASSIGNMENTS:
            return {
                ...state,
                teamAssignments: action.payload
            }
        default:
            return state;
    }
}