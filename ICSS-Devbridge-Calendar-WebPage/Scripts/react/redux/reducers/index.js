import { combineReducers } from "redux";
import assignmentReducer from "./assignmentReducer";
import teamReducer from "./teamReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
    assignments: assignmentReducer,
    teamTree: teamReducer,
    login: loginReducer
})