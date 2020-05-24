import { LOGIN } from "../actions/types";

const initialState = {
    token: getAuthState()
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

function getAuthState() {
    const token = JSON.parse(localStorage.getItem('token')) || undefined;

    return { accessToken: token }
}