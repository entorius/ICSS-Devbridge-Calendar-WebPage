import { LEARNING_TREE, LEARNING_SELECTED_USERS } from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";


export const generateLearningTree = (topicsData, usersData) => dispatch => {
    console.log("topics data and users data");
    console.log(topicsData);
    console.log(usersData);

    var depth = countDepth(topicsData);
    var levelSizes = countLayersSizes(topicsData, depth);
    var maxLayerSize = countMaxLayerSize(levelSizes);
    console.log("Depth: " + depth);
    console.log("Levels sizes: ");
    console.log(levelSizes);
    console.log("Max level size: ");
    console.log(maxLayerSize);

    var treeHeight = 500 > depth * 100 ? 500 : depth * 100;
    var treeMiddle = 500 > (maxLayerSize.maxLayerSize * 75) ? 500 : maxLayerSize.maxLayerSize * 75;

    levelSizes.map(LS => LS.thisNodePlace = treeMiddle - LS.size * 75);

    var learningTree = {
        nodes: [{ id: 'Root', x: treeMiddle, y: treeHeight, learnedMembers: 0, symbolType: 'square', color: "#37474f", parent: null, level: 0 }],
        links: []
    };
    topicsData.nodes.forEach((node) => {
        var nodeLevel = 0;
        if (node.level <= 1) {
            nodeLevel = node.level ? 1 : 0;
        }
        else {
            nodeLevel = node.level
        }
        var createdNode = createNodeObject(node, treeHeight, levelSizes[nodeLevel], usersData);
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
    console.log("********* levelSize *********");
    console.log(levelSize.thisNodePlace);
    var learnedUsers = 0;
    
    usersData.users.map(user =>
        user.learnedTopics.map(topic =>
            topic.topicId == obj.id ? learnedUsers = learnedUsers + 1 : null));
    var color = learnedUsers > 0 ? "#33eb91" : "#00b0ff";
    var node = [{
        id: obj.id,
        x: levelSize.thisNodePlace,
        y: treeHeight - ((levelSize.level) * 100),
        level: obj.level,
        symbolType: obj.symbolType,
        color: color,
        parent: obj.parent,
        topic: obj.topic,
        learnedMembers: learnedUsers,
    }];
    console.log("after");
    return node;
}

function createLinkObject(obj) {
    if (obj.parent != null) {
        var link = [{
            source: obj.parent,
            target: obj.id,
            color: "#ff9800"
        }];
        return link;
    }
    return null;
}

function countDepth(obj) {
    var MaxDepth = 1
    obj.nodes.map(node =>
        node.level > MaxDepth ? MaxDepth = node.level : null 
    );
    return MaxDepth;
}

function countLayersSizes(obj, Depth) {
    var levelsSizesArray = [];
    for (var i = 0; i <= Depth; i++) {
        var levelSize = 0;
        obj.nodes.map(node =>
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
