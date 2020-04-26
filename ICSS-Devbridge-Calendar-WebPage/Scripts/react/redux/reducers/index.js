import { combineReducers } from "redux";
import assignmentReducer from "./assignmentReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
    assignments: assignmentReducer,
    login: loginReducer
})