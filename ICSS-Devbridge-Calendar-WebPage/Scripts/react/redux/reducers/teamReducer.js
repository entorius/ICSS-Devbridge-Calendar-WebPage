import { FETCH_MY_TEAM_TREE } from "../actions/types";

const initialState = {
    items: [],
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MY_TEAM_TREE:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}