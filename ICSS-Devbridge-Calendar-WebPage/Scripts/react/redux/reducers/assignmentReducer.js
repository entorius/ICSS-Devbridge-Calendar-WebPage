import { FETCH_ASSIGNMENTS, FETCH_TEAM_ASSIGNMENTS, NEW_ASSIGNMENT } from "../actions/types";

const initialState = {
    items: [],
    teamAssignments: [],
    error: null,
    newAssignment: null
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
        case NEW_ASSIGNMENT: {
            return {
                ...state,
                newAssignment: action.payload,
                error: action.error
            }
        }
        default:
            return state;
    }
}