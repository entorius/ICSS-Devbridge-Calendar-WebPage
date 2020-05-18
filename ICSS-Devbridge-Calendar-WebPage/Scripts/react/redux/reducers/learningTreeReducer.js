import { LEARNING_TREE } from "../actions/types";

const initialState = {
    learningTree: {
        nodes: [{ id: 'Root', x: 500, y: 500, level: 'true', symbolType: 'square', color: 'lightgreen', parent: null }],
        links: []}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LEARNING_TREE:
            return {
                ...state,
                learningTree: action.payload
            }
        default:
            return state;
    }
}