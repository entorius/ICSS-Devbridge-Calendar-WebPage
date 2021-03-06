﻿import { combineReducers } from "redux";
import assignmentReducer from "./assignmentReducer";
import teamReducer from "./teamReducer";
import loginReducer from "./loginReducer";
import topicReducer from "./topicReducer";
import userReducer from "./userReducer";
import learntTopicsReducer from "./learntTopicsReducer";
import learningTreeReducer from "./learningTreeReducer";

export default combineReducers({
    assignments: assignmentReducer,
    teamTree: teamReducer,
    login: loginReducer,
    topics: topicReducer,
    users: userReducer,
    learntTopics: learntTopicsReducer,
    learningTree: learningTreeReducer
})