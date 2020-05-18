import { FETCH_TEAM_TREE, UPDATE_MANAGER } from "../actions/types";

const initialState = {
    items: [],
    user: {},
    error: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TEAM_TREE:
            return {
                ...state,
                items: action.payload
            }
        case UPDATE_MANAGER:
            return {
                ...state,
                user: action.payload,
                error: action.error
            }
        default:
            return state;
    }
}
