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
    var loginTokenGet = localStorage.getItem('token');
    var expirationTimeGet = localStorage.getItem('expirationTime');
    const token = loginTokenGet == 'undefined'? undefined : JSON.parse(localStorage.getItem('token'));
    const expirationTime = expirationTimeGet == 'undefined' ? undefined: JSON.parse(localStorage.getItem('expirationTime'));
    return {
        accessToken: token,
        expirationTime: expirationTime
    }
}