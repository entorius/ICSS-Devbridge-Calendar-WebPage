import { FETCH_CURRENT_USER, GET_CHECK_REGISTERED, FINISH_REGISTRATION } from "../actions/types";

const initialState = {
    user: {},
    isRegistered: {},
    finishRegistration: {},
    error: {}
}

export default function (state = initialState,action) {
    switch (action.type) {
        case FETCH_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                error: action.error
            }
        case GET_CHECK_REGISTERED:
            return {
                ...state,
                isRegistered: action.payload,
                error: action.error
            }
        case FINISH_REGISTRATION:
            return {
                ...state,
                finishRegistration: action.payload,
                error: action.error
            }
        default:
            return state;
    }
}