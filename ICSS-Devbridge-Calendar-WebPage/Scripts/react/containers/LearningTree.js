import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../Content/LearningTree.less";
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
const data = {
  
    nodes: [
        { id: 'beginer',        x: 300, y: 300, level: 'true', symbolType: 'square',  color: 'lightgreen' },
        { id: 'intermediate',   x: 300, y: 200, level: 'true', symbolType: 'square',  color: 'lightgreen' },
        { id: 'advanced',       x: 300, y: 100, level: 'true', symbolType: 'square',  color: 'lightgreen'},
        { id: '1', x: 275, y: 75, topic: "C#",   learnedMembers: "0", label: "string" },
        { id: '2', x: 325, y: 75, topic: "Java", learnedMembers: "1", label: "string" },
        { id: '3', x: 250, y: 175, topic: "C#",   learnedMembers: "2",   label: "string" },
        { id: '4', x: 350, y: 175, topic: "Java", learnedMembers: "0", label: "string" },
        { id: '5', x: 350, y: 325, topic: "Css",  learnedMembers: "3",  label: "string" },
        { id: '6', x: 300, y: 350, topic: "Java", learnedMembers: "1", label: "string" },
        { id: '7', x: 250, y: 325, topic: "Html", learnedMembers: "0", label: "string" },
    ],
    links: [
        { source: 'beginer', target: 'intermediate' },
        { source: 'intermediate', target: 'advanced' },
        { source: 'beginer', target: '5' },
        { source: 'beginer', target: '6' },
        { source: 'beginer', target: '7' },
        { source: 'intermediate', target: '3' },
        { source: 'intermediate', target: '4' },
        { source: 'advanced', target: '1' },
        { source: 'advanced', target: '2' },

    ]
};
const myConfig = {
    nodeHighlightBehavior: true,
    staticGraphWithDragAndDrop: true,
    directed: true,
    collapsible: true,
    width: 800,
    height: 680,
    d3: {
        gravity: -200,
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
                            data={data}
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

export default LearningTree;