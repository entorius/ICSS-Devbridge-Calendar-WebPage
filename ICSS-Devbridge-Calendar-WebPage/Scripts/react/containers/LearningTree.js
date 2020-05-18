import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../Content/LearningTree.less";
//Redux
import { connect } from 'react-redux';
import { generateLearningTree } from '../redux/actions/learningTreeActions';
import PropTypes from 'prop-types';
//Material UI components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";

//Icons

import ForwardIcon from '@material-ui/icons/Forward';

//React D3 Graph
import { Graph } from 'react-d3-graph';
//React D3 Graph configuration
function myCustomLabelBuilder(node) {
    var label;
    if (node.level === 'true') {
        label = node.id;
    }
    else {
        label = node.topic + '\n Learned members: ' + node.learnedMembers;
    }
    return label;
}
function generateX(node) {
    console.log("something")
    console.log(node)
    return node.y
}
const data = {
  
    nodes: [
        { id: 'Root', x: 500, y: 500, level: 'true', symbolType: 'square', color: 'lightgreen', parent: null },
        { id: '1', x: 150, y: 400, topic: "C#",   learnedMembers: "0", label: "string",parent:'Root' },
        { id: '2', x: 275, y: 400, topic: "Java", learnedMembers: "1", label: "string", parent: 'Root' },
        { id: '3', x: 400, y: 400, topic: "C#", learnedMembers: "2", label: "string", parent: 'Root' },
        { id: '4', x: 525, y: 400, topic: "Java", learnedMembers: "0", label: "string", parent: 'Root' },
        { id: '5', x: 650, y: 400, topic: "Css", learnedMembers: "3", label: "string", parent: 'Root' },
        { id: '6', x: 775, y: 400, topic: "Java", learnedMembers: "1", label: "string", parent: 'Root' },
        { id: '7', x: 900, y: 400, topic: "Html", learnedMembers: "0", label: "string", parent: 'Root' },
    ],
    links: [
        { source: 'Root', target: '1' },
        { source: 'Root', target: '2' },
        { source: 'Root', target: '3' },
        { source: 'Root', target: '4' },
        { source: 'Root', target: '5' },
        { source: 'Root', target: '6' },
        { source: 'Root', target: '7' },

    ]
};
const myConfig = {
    nodeHighlightBehavior: true,
    staticGraphWithDragAndDrop: true,
    directed: true,
    collapsible: true,
    width: 1100,
    height: 680,
    d3: {
        gravity: 0,
    },
    
    node: {
        color: "#8400FF",
        fontColor: "#FFFFFF",
        size: 200,
        highlightStrokeColor: 'blue',
        labelProperty: myCustomLabelBuilder,
        symbolType : "sqaure"
    },
    link: {
        highlightColor: 'lightblue',
        strokeWidth: 3
    }
};

class LearningTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamTree: {
                nodes: [{ id: 'Root', x: 500, y: 500, level: 'true', symbolType: 'square', color: 'lightgreen', parent: null }],
                links: []
            }
        }
        console.log(this.props);
        //this.renderTeamTree(data)
    }
    componentDidMount() {
        this.props.generateLearningTree(data);
    }
    renderTeamTree(data) {
        console.log(data)
        console.log("nodes and links");
        data.nodes.forEach((node) => {
            var createdNode = this.createNodeObject(node);
            var createdLink = this.createLinkObject(node);
            var joinedNodes = this.state.teamTree.nodes.concat(createdNode)
            var joinedLinks = this.state.teamTree.links;
            if (createdLink != null) {
                joinedLinks = this.state.teamTree.links.concat(createdLink)
            }
            console.log(joinedNodes);
            this.setState(prevState => ({
                teamTree: {                   // object that we want to update
                    ...prevState.teamTree,    // keep all other key-value pairs
                    nodes: joinedNodes ,      // update the value of specific key
                    links: joinedLinks
                }
            }))
            
            console.log(this.state.teamTree);
        })
        console.log(this.state.teamTree);
    }
    createNodeObject(obj){
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
    createLinkObject(obj) {
        if (obj.parent != null) {
            var link = [{
                source: obj.parent, target: obj.id
            }];
            return link;
        }
        return null;
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={styles.mainPage} >
                <SideBar />
                <div className={styles.LearningTreePageStyle}>
                    <div className={styles.title}>
                        Learning Tree
                    </div>
                    <div className={styles.mainTreePart}>
                        <div className={styles.graphPart}>
                            <Graph
                                id='learningTreeGraph' // id is mandatory, if no id is defined rd3g will throw an error
                                data={this.props.learningTree.learningTree}
                            config={myConfig}
                            />
                        </div>
                        <div className={styles.rightSideBar}>
                            <div className={styles.nodeRepresentation}>
                                <div className={styles.nodeRepresentationCircleTopicComplexity}></div>
                                <div className={styles.sideBarBubleTitle}>
                                    Topic complexity
                                </div>
                            </div>
                            <div className={styles.nodeRepresentation}>
                                <div className={styles.nodeRepresentationCircleTopic}></div>
                                <div className={styles.sideBarBubleTitle}>
                                        Topic 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
LearningTree.propTypes = {
    generateLearningTree: PropTypes.func.isRequired,
    learningTree: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    learningTree: state.learningTree,
    token: state.login
})

export default connect(mapStateToProps, { generateLearningTree })(LearningTree);