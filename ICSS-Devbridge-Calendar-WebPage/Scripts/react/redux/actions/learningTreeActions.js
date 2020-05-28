import {
    LEARNING_TREE, LEARNING_SELECTED_USERS, FETCH_ALL_TOPICS, FETCH_USER_LEARNED_TOPICS, FETCH_TEAM_LEARNED_TOPICS,
    FETCH_DESCENDANT_MANAGERS, SELECT_MANAGER, RESET_DATA
} from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";

export const fetchUserLearnedTopics = (accessToken, userId) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics/learnt/${userId}`, config)
        .then(response => {
            const userLearnedTopics = response.data;
            dispatch({
                type: FETCH_USER_LEARNED_TOPICS,
                payload: userLearnedTopics
            })
        });
}
export const fetchTeamLearnedTopics = (accessToken, managerId) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics/teamLearnt/${managerId}`, config)
        .then(response => {
            const teamLearnedTopics = response.data;
            dispatch({
                type: FETCH_TEAM_LEARNED_TOPICS,
                payload: teamLearnedTopics
            })
        });
}
export const fetchDescendantManagers = (accessToken) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/users/managers`, config)
        .then(response => {
            const descendantManagers = response.data;
            dispatch({
                type: FETCH_DESCENDANT_MANAGERS,
                payload: descendantManagers
            })
        });
}
export const fetchAllTopics = (accessToken) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics`, config)
        .then(response => {
            const topics = response.data;
            dispatch({
                type: FETCH_ALL_TOPICS,
                payload: topics
            })
        });
}

export const selectManager = (user) => dispatch =>{
    dispatch({
        type: SELECT_MANAGER,
        payload: user
    })
}
export const resetData = () => dispatch => {
    dispatch({
        type: RESET_DATA,
        payload: {}
    })
}

export const generateLearningTree = (newUsersData, newTopicsData) => dispatch => {
    newTopicsData = addObjLevels(newTopicsData);
    var depth = countDepth(newTopicsData);
    var levelSizes = countLayersSizes(newTopicsData, depth);
    var maxLayerSize = countMaxLayerSize(levelSizes);

    var treeHeight = 500 > depth * 100 ? 500 : depth * 100;
    var treeMiddle = 500 > (maxLayerSize.maxLayerSize * 75) ? 500 : maxLayerSize.maxLayerSize * 75;

    levelSizes.map(LS => LS.thisNodePlace = treeMiddle - LS.size * 75);

    var learningTree = {
        nodes: [{ id: 0, x: treeMiddle, y: treeHeight + 200, learnedMembers: 0, symbolType: 'square', color: "#37474f", parent: null, level: 0 }],
        links: []
    };
    newTopicsData.forEach((node) => {
        var nodeLevel = 0;
        if (node.level <= 1) {
            nodeLevel = node.level ? 1 : 0;
        }
        else {
            nodeLevel = node.level
        }
        var createdNode = createNodeObject(node, treeHeight, levelSizes[nodeLevel], newUsersData);
        levelSizes[nodeLevel].thisNodePlace += 150;
        var createdLink = createLinkObject(node);
        var joinedNodes = learningTree.nodes.concat(createdNode)
        var joinedLinks = learningTree.links;
        if (createdLink != null) {
            joinedLinks = learningTree.links.concat(createdLink)
        }
        learningTree = {
            nodes: joinedNodes,
            links: joinedLinks
        };
    })
    dispatch({
        type: LEARNING_TREE,
        payload: learningTree
    })
   
}
export const setSelectedLearningTreeUsers = (users) => dispatch => {

    dispatch({
        type: LEARNING_SELECTED_USERS,
        payload: users
    })

}

function createNodeObject(obj, treeHeight, levelSize, usersData) {
    var learnedUsers = 0;
    
    usersData.map(user =>
        user.Topics.map(topic =>
            topic.TopicId == obj.TopicId ? learnedUsers = learnedUsers + 1 : null));
    var color = learnedUsers > 0 ? "#33eb91" : "#00b0ff";
    console.log(levelSize.thisNodePlace);
    console.log(treeHeight - ((levelSize.level) * 100));
    var node = [{
        id: obj.TopicId,
        x: levelSize.thisNodePlace,
        y: treeHeight - ((levelSize.level) * 100),
        level: obj.level,
        symbolType: "circle",
        color: color,
        parent: obj.ParentTopicId == null ? 0 : obj.ParentTopicId,
        topic: obj.Name,
        learnedMembers: learnedUsers,
    }];
    return node;
}

function createLinkObject(obj) {
    if (typeof obj.parent == "undefined") {
        var link = [{
            source: obj.ParentTopicId == null ? 0 : obj.ParentTopicId,
            target: obj.TopicId,
            color: "#ff9800"
        }];
        return link;
    }
    return null;
}
function addObjLevels(obj) {
    obj.map(function (node) {
        if (node.ParentTopicId == null) {
            node.level = 1
        }
        else {
            node.level = obj[node.ParentTopicId - 1].level + 1;
        }
    });
    return obj;
}

function countDepth(obj) {
    var MaxDepth = 1
    obj.map(node =>
        node.level > MaxDepth ? MaxDepth = node.level : null 
    );
    return MaxDepth;
}

function countLayersSizes(obj, Depth) {
    var levelsSizesArray = [];
    for (var i = 0; i <= Depth; i++) {
        var levelSize = 0;
        obj.map(node =>
            node.level == i ? levelSize++ : null
        );
        levelsSizesArray.push({
            level: i,
            size: levelSize,
            thisNodePlace: 0
        })
    }
    return levelsSizesArray;
}
function countMaxLayerSize(obj) {
    var ansObject = {
        maxLayerSize: 0,
        level: 0
    }
    obj.map(node => {
        if (node.size > ansObject.maxLayerSize) {
            ansObject.maxLayerSize = node.size;
            ansObject.level = node.level;
        }
    }
    );
    return ansObject;
}
