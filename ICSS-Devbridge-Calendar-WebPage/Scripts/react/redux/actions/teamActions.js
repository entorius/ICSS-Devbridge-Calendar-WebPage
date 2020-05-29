import { FETCH_TEAM_TREE, UPDATE_MANAGER, CHANGE_USER_RESTRICTIONS, SELECT_CURRENT_TEAM } from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";


export const fetchTeamTree = (accessToken) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/users/teamTree`, config)
        .then(teamTreeResponse => {
            const teamTree = teamTreeResponse.data;
            dispatch({
                type: FETCH_TEAM_TREE,
                payload: teamTree
            })
        });
}

export const changeRestrictionsForUser = (accessToken, userData) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    const data = {
        ConsecLimit: userData.consecLimit,
        MonthlyLimit: userData.monthlyLimit,
        YearlyLimit: userData.yearlyLimit
    }

    return axios.patch(baseApiUrl + `/api/users/restrictions/${userData.id}`, data, config)
        .then(response => {
            dispatch({
                type: CHANGE_USER_RESTRICTIONS,
                payload: response.data
            }) });
}

export const changeRestrictionsForTeam = (accessToken, teamData) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }


    const data = {
        ConsecLimit: teamData.consecLimit,
        MonthlyLimit: teamData.monthlyLimit,
        YearlyLimit: teamData.yearlyLimit
    }

    return axios.patch(baseApiUrl + `/api/users/restrictions/team/${teamData.managerId}`, data, config);
}

export const changeGlobalRestrictions = (accessToken, restrictions) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    const data = {
        ConsecLimit: restrictions.consecLimit,
        MonthlyLimit: restrictions.monthlyLimit,
        YearlyLimit: restrictions.yearlyLimit
    }

    return axios.patch(baseApiUrl + `/api/users/restrictions/global`, data, config);
}

export const addTeamMember = (accessToken, userObject, managerId) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    const user = {
        FirstName: userObject.name,
        LastName: userObject.surname,
        Email: userObject.email,
        Role: userObject.role,
        ManagerId: managerId
    }

    return axios.post(baseApiUrl + `/api/users`, user, config);
}

export const reassignTeamMember = (accessToken, userData) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    const manager = {
        ManagerId: userData.managerId
    }

    let user = null;
    let errors = null;

    return axios.patch(baseApiUrl + `/api/users/manager/${userData.userId}`, manager, config)
        .then(response => {
            user = response.data
        }).catch(error => {
            errors = error.response.data
        })
        .then(() => {
            dispatch({
                type: UPDATE_MANAGER,
                payload: user,
                error: errors
            });
        });
}
export const selectCurrentTeam = (allMembers, managerTeamId) => dispatch => {
    var selectedteam = selectTeam(allMembers, managerTeamId);

    dispatch({
        type: SELECT_CURRENT_TEAM,
        payload: selectedteam
    })
}

function selectTeam(allMembers, managerTeamId) {
    var selectedTeam = null;
    if (allMembers.$id == managerTeamId) {
        selectedTeam = allMembers.Children;
    }
    else if (Array.isArray(allMembers.Children)) {
        var selectingTeam = null;
        allMembers.Children.map(child => selectTeam(child, managerTeamId) != null ? selectingTeam = selectTeam(child, managerTeamId) :null );
        selectingTeam != null ? selectedTeam = selectingTeam : null
    }
    
    return selectedTeam
}
