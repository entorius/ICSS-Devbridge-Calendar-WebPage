import { FETCH_TEAM_TREE } from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";


export const fetchTeamTree = (accessToken) => dispatch => {
    console.log(baseApiUrl);

    var config = {
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