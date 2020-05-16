import { LOGIN } from "../actions/types";

const initialState = {
    token: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload,
                error: action.error
            }
        default:
            return state;
    }
}