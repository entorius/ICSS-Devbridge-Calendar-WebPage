import {
    FETCH_CURRENT_USER,
    GET_CHECK_REGISTERED,
    FINISH_REGISTRATION,
    UPDATE_PASSWORD_FINISHED,
    UPDATE_PASSWORD_STARTED
} from "../actions/types";

const initialState = {
    user: {},
    isRegistered: null,
    finishRegistration: {},
    error: null,
    isLoading: false
}

export default function (state = initialState, action) {
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
        case UPDATE_PASSWORD_STARTED:
            return {
                isLoading: true,
                error: null
            }
        case UPDATE_PASSWORD_FINISHED:
            return {
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}