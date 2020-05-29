import {
    FETCH_TEAM_TREE, UPDATE_MANAGER, CHANGE_USER_RESTRICTIONS, SELECT_CURRENT_TEAM } from "../actions/types";

const initialState = {
    items: [],
    user: {},
    error: [],
    selectedTeam: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TEAM_TREE:
            return {
                ...state,
                items: action.payload
            }
        case CHANGE_USER_RESTRICTIONS:
            var userReplacement = action.payload;
            var users = JSON.parse(JSON.stringify(state.items)); //this creates a deep copy
            users = findAndReplaceUser(users, userReplacement);
            //const index = counters.findIndex(x => x.id == counter.id);
            return {
                ...state,
                items: users
            }
        case UPDATE_MANAGER:
            return {
                ...state,
                user: action.payload,
                error: action.error
            }
        case SELECT_CURRENT_TEAM:
            return {
                ...state,
                selectedTeam: action.payload
            }
        default:
            return state;
    }
}

function findAndReplaceUser(users,userReplacement) {
    var newUsers = users;
    if (newUsers.This.UserId == userReplacement.UserId) {
        newUsers.This = userReplacement;
    }
    else {
        Array.isArray(newUsers.Children) ? newUsers.Children.map(user => user = findAndReplaceUser(user, userReplacement)) : null;
    }
    return newUsers;
}
