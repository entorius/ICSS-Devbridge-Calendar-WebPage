import { combineReducers } from "redux";
import assignmentReducer from "./assignmentReducer";
import teamReducer from "./teamReducer";
import loginReducer from "./loginReducer";
import learntTopicsReducer from "./learntTopicsReducer";
import learningTreeReducer from "./learningTreeReducer";

export default combineReducers({
    assignments: assignmentReducer,
    teamTree: teamReducer,
    login: loginReducer,
    learntTopics: learntTopicsReducer,
    learningTree: learningTreeReducer
})