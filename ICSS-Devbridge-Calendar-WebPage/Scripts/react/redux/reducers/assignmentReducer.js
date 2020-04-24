import { FETCH_ASSIGNMENTS, NEW_ASSIGNMENT } from "../actions/types";

const initialState = {
    items: [],
    item: {}
}

export default function (state = initialState,action) {
    switch (action.type) {
        case FETCH_ASSIGNMENTS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}