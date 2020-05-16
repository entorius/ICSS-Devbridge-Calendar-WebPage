import { FETCH_MY_TEAM_TREE,  } from "./types";
import { connectionString } from "../connectionStrings";
import axios from "axios";


export const fetchMyTeamTree = (userID) => dispatch => {
    console.log(connectionString);
    //connectionString - variable in web.config describing server route( in our case e.t.c https://localhost:44374/)
    axios.get(connectionString + `/api/users/teamTree/` + userID)
        .then(myTeamTree => {
            const jsonMyTeamTree = myTeamTree.data;
            dispatch({
                type: FETCH_MY_TEAM_TREE,
                payload: jsonMyTeamTree
            })
        });
}