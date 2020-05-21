import { LEARNING_TREE, LEARNING_SELECTED_USERS, LEARNING_DIALOG_OPEN } from "../actions/types";

const initialState = {
    learningTree: {
        nodes: [{ id: 'Root', x: 500, y: 500, level: 'true', symbolType: 'square', color: 'lightgreen', parent: null }],
        links: []
    },
    learningTreeSelectedUsers: [],
    learningTreeDialogOpen: false
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
        default:
            return state;
    }
}