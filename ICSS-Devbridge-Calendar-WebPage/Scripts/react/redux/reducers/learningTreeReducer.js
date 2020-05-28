import {
    LEARNING_TREE, LEARNING_SELECTED_USERS, FETCH_USER_LEARNED_TOPICS, FETCH_TEAM_LEARNED_TOPICS,
    FETCH_DESCENDANT_MANAGERS, SELECT_MANAGER, FETCH_ALL_TOPICS, RESET_DATA} from "../actions/types";

const initialState = {
    learningTree: {
        nodes: [{ id: 'Root', x: 500, y: 500, level: 'true', symbolType: 'square', color: 'lightgreen', parent: null }],
        links: []
    },
    learningTreeSelectedUsers: [],
    fetchedUserTopic: [],
    fetchedTeamTopics: [],
    fetchedDescendantManagers: [],
    selectedManager: {},
    allTopics:[]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LEARNING_TREE:
            return {
                ...state,
                learningTree: action.payload
            }
        case LEARNING_SELECTED_USERS:
            return {
                ...state,
                learningTreeSelectedUsers: action.payload
            }
        case FETCH_USER_LEARNED_TOPICS:
            return {
                ...state,
                fetchedUserTopic: action.payload
            }
        case FETCH_TEAM_LEARNED_TOPICS:
            return {
                ...state,
                fetchedTeamTopics: action.payload
            }
        case FETCH_DESCENDANT_MANAGERS:
            return {
                ...state,
                fetchedDescendantManagers: action.payload
            }
        case SELECT_MANAGER:
            return {
                ...state,
                selectedManager: action.payload
            }
        case FETCH_ALL_TOPICS:
            return {
                ...state,
                allTopics: action.payload
            }
        case RESET_DATA: {
            return {
                ...state,
                learningTree: {
                    nodes: [{ id: 'Root', x: 500, y: 500, level: 'true', symbolType: 'square', color: 'lightgreen', parent: null }],
                    links: []
                },
                learningTreeSelectedUsers: [],
                fetchedUserTopic: [],
                fetchedTeamTopics: [],
                fetchedDescendantManagers: [],
                selectedManager: {},
                allTopics: []
            }
        }
        default:
            return state;
    }
}