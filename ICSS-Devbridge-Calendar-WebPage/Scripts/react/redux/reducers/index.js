import { combineReducers } from "redux";
import assignmentReducer from "./assignmentReducer";
import teamReducer from "./teamReducer";

export default combineReducers({
    assignments: assignmentReducer,
    teamTree: teamReducer
})