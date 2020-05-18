import { LEARNING_TREE } from "./types";
import { connectionString } from "../connectionStrings";
import axios from "axios";


export const generateLearningTree = (data) => dispatch => {
    console.log(data);

    console.log("nodes and links");
    var learningTree = {
        nodes: [],
        links: []
    };
    data.nodes.forEach((node) => {
        var createdNode = createNodeObject(node);
        var createdLink = createLinkObject(node);
        var joinedNodes = learningTree.nodes.concat(createdNode)
        var joinedLinks = learningTree.links;
        if (createdLink != null) {
            joinedLinks = learningTree.links.concat(createdLink)
        }
        console.log(joinedNodes);
        learningTree = {
            nodes: joinedNodes,
            links: joinedLinks
        };
    })
    console.log(learningTree);
    dispatch({
        type: LEARNING_TREE,
        payload: learningTree
    })
   
}
function createNodeObject(obj){
    var node = [{
        id: obj.id,
        x: obj.x,
        y: obj.y,
        level: obj.level,
        symbolType: obj.symbolType,
        color: obj.color,
        parent: obj.parent,
        topic: obj.topic,
        learnedMembers: obj.learnedMembers,
    }];
    return node;
}
function createLinkObject(obj) {
    if (obj.parent != null) {
        var link = [{
            source: obj.parent, target: obj.id
        }];
        return link;
    }
    return null;
}