import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../Content/LearningTree.less";
//Redux
import { connect } from 'react-redux';
import {
    generateLearningTree, setSelectedLearningTreeUsers, fetchUserLearnedTopics, fetchTeamLearnedTopics,
    fetchDescendantManagers
} from '../redux/actions/learningTreeActions';
import PropTypes from 'prop-types';
//Material UI components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';


//Icons

import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

//React D3 Graph
import { Graph } from 'react-d3-graph';
//React D3 Graph configuration
function myCustomLabelBuilder(node) {
    var label;
    if (node.level == 0) {
        label = node.id;
    }
    else {
        label = node.topic + '\n Learned members: ' + node.learnedMembers;
    }
    return label;
}
function generateX(node) {
    //console.log("something")
    //console.log(node)
    return node.y
}
const currentUserData = {
    users: [
    { id: '1', name: 'Josh', surname: 'Levinski', learnedTopics: [{ topicId: 1 }, { topicId: 3 }] },
    ]};
const usersData = {

    users: [
        { id: '1', name: 'Josh', surname: 'Levinski',   learnedTopics: [{ topicId: 1 }, { topicId: 2 }] },
        { id: '2', name: 'Hana', surname: 'Meredi',     learnedTopics: [{ topicId: 1 }, { topicId: 2 }] },
        { id: '3', name: 'Lama', surname: 'Savinski',   learnedTopics: [{ topicId: 1 }, { topicId: 2 }] },
        { id: '4', name: 'Tor',  surname: 'Kasparowski',learnedTopics: [{ topicId: 1 }, { topicId: 2 }] },
        { id: '5', name: 'Josh', surname: 'Levinski',   learnedTopics: [{ topicId: 1 }, { topicId: 2 }] },
        { id: '6', name: 'Josh', surname: 'Levinski',   learnedTopics: [{ topicId: 1 }, { topicId: 2 }] },
        { id: '7', name: 'Josh', surname: 'Levinski',   learnedTopics: [{ topicId: 1 }, { topicId: 2 }] },
        { id: '8', name: 'Josh', surname: 'Levinski',   learnedTopics: [{ topicId: 1 }, { topicId: 2 }] },
    ]
    
};
const data = {
  
    nodes: [
        
        { id: '1', x: 150, y: 400, topic: "C#",   learnedMembers: 0, label: "string",parent:'Root', level: 1},
        { id: '2', x: 275, y: 400, topic: "Java", learnedMembers: 1, label: "string", parent: 'Root', level: 1 },
        { id: '3', x: 400, y: 400, topic: "C#", learnedMembers: 2, label: "string", parent: 'Root', level: 1 },
        { id: '4', x: 525, y: 400, topic: "Java", learnedMembers: 0, label: "string", parent: 'Root', level: 1 },
        { id: '5', x: 650, y: 400, topic: "Css", learnedMembers: 3, label: "string", parent: 'Root', level: 1 },
        { id: '6', x: 775, y: 400, topic: "Java", learnedMembers: 1, label: "string", parent: 'Root', level: 1 },
        { id: '7', x: 900, y: 400, topic: "Html", learnedMembers: 0, label: "string", parent: '1', level: 2 },
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
    directed: false,
    collapsible: false,
    width: '100%',
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

class TopicLearnedMembersDialog extends React.Component {
    constructor(props) {
        super(props);
        {/* TODO: state for adding team member*/ }
        this.state = {
            selectedUsers: props.currentLearnedUser,
            selectedNode: props.selectedNode,
            open: props.open,
            email: "some@gmail.com",
            dense: true,
            secondary: false,
        }
        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange(evt) {
        // check it out: we get the evt.target.name 
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }
    componentDidUpdate(prevProps) {
        //console.log("props");
        //console.log(this.props);
        //console.log("prevProps");
        //console.log(prevProps);
        //if props for this class updated open dialog
        if (this.props.open !== prevProps.open) {

            this.setState({ open: this.props.open });
        }
    }

    closeDialog = () => {
        this.setState({ open: false })
    }

    render() {

        //event to handle close (closes dialog)
        const handleClose = () => {
            this.setState({ open: false });
        };

        return (
            <Dialog onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={this.state.open}>
                <DialogTitle
                    id="change-restriction-dialog-title"
                    disableTypography
                    classes={{ root: styles.topicLearnedMembersTitle }}>
                    Learned members
                    <PersonIcon className={styles.popUpButtonPicture} />
                </DialogTitle>
                <div>
                    <Grid item xs={12} md={6}>
                        <div className={styles.demo}>
                            <List dense={this.state.dense}>
                                {this.props.currentLearnedUser.map(user =>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.name}
                                            secondary={this.state.secondary ? 'Secondary text' : null}
                                            classes={{ primary: styles.nodeMembersLearnedTopicsMemberLabel}}
                                        />
                                    </ListItem>)}
                            </List>
                        </div>
                    </Grid>
                </div>
                <div className={styles.topicLearnedMembersButtons}>
                    <Button
                        className={styles.closeButton}
                        classes={{ label: styles.popUpButtonLabel }}
                        onClick={() => this.closeDialog()}>
                        Close
                    </Button>
                </div>
            </Dialog>
        );
    }
}

class TeamSelectDialog extends React.Component {
    constructor(props) {
        super(props);
        {/* TODO: state for adding team member*/ }
        this.state = {
            
            open: props.open,
            teamName: "",
            dense: true,
            secondary: false,
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(evt) {
        // check it out: we get the evt.target.name 
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }
    componentDidUpdate(prevProps) {
        //console.log("props");
        //console.log(this.props);
        //console.log("prevProps");
        //console.log(prevProps);
        //if props for this class updated open dialog
        if (this.props.open !== prevProps.open) {

            this.setState({ open: this.props.open });
        }
    }

    closeDialog = () => {
        this.setState({ open: false })
    }

    render() {

        //event to handle close (closes dialog)
        const handleClose = () => {
            this.setState({ open: false });
        };
        const handleListItemClick = (value) => {
            this.setState({ open: false })
        };


        return (
            <Dialog onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={this.state.open}
                classes={{ paper: styles.selectTeamDialog }}>
                <DialogTitle
                    id="change-restriction-dialog-title"
                    disableTypography
                    classes={{ root: styles.selectTeamTitle }}>
                    Select Team
                    <GroupIcon className={styles.popUpButtonPicture} />
                </DialogTitle>
                <div className={styles.selectTeamBody}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.teamName}
                        className={styles.selectTeam}
                        name="teamName"
                        input={<Input />}
                        onChange={this.handleChange}>
                        >{usersData.users.map((user) => (
                            <MenuItem key={user.name} value={user.name} >
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>


                </div>
                <div className={styles.selectTeamButtons}>
                    <Button
                        className={styles.closeButton}
                        classes={{ label: styles.popUpButtonLabel }}
                        onClick={() => handleListItemClick(this.teamName)}>
                        Cancel
                    </Button>
                    {/* TODO: add action to select team for team tree*/}
                    <Button
                        className={styles.actionButton}
                        classes={{ label: styles.popUpButtonLabel }}
                        onClick={() => handleListItemClick(this.teamName)}>
                        Select Team
                    </Button>
                </div>
            </Dialog>
        );
    }
}

class LearningTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            learnedUsers: [],
            openMembersDialog: false,
            openTeamDialog: false,
            radioButtonSelectedGeneratingOption: "self",
            selectedNode: 0

        };
    }
    async componentDidMount() {
        //this.props.fetchUserLearnedTopics();
        //this.props.fetchTeamLearnedTopics();
        await this.props.fetchDescendantManagers(this.props.token.accessToken).then(() => {
            console.log(this.props.learningTree);
        });
        this.props.generateLearningTree(data, currentUserData);
    }
    resetMemberDialogState() {
        this.setState({ ...this.state, openMembersDialog: false }
        );
    }
    onClickNode = nodeId => {
        this.setState({ openMembersDialog: false }, () => {
            var localLearnedUsers = [];
            //console.log("nodeId: ");
            //console.log(nodeId);
            if (this.state.radioButtonSelectedGeneratingOption == "team") {
                usersData.users.map(user =>
                    user.learnedTopics.map((top) => {
                        top.topicId == nodeId ? localLearnedUsers.push(user) : "nothing";
                    }));
                //console.log(localLearnedUsers);
            }
            else if (this.state.radioButtonSelectedGeneratingOption == "self") {
                currentUserData.users.map(user =>
                    user.learnedTopics.map((top) => {
                        top.topicId == nodeId ? localLearnedUsers.push(user) : "nothing";
                    }));
                //console.log(localLearnedUsers);
            }
            this.props.setSelectedLearningTreeUsers(localLearnedUsers);
            //console.log(this.props);
            this.setState({
                selectedNode: nodeId,
                openMembersDialog: true
            });
        })
        
        
       
        //console.log("ending onClickNode state")
    };
    handleChange = evt => {
        //console.log("evt changing");
        //console.log(evt);
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ radioButtonSelectedGeneratingOption: evt.target.value }, () => {
            if (this.state.radioButtonSelectedGeneratingOption === "self") {
                this.props.generateLearningTree(data, currentUserData);
            }
            else if (this.state.radioButtonSelectedGeneratingOption === "team") {
                this.props.generateLearningTree(data, usersData);
            }
        });
    }
    onTeamSelectClick = evt => {
        this.setState({ openTeamDialog: false }, () => {
            this.setState({ openTeamDialog: true })
        });
        
        //console.log('onClick');
    }
    
    render() {
        return (
            <div className={styles.mainPage} >
                <SideBar />
                <div className={styles.LearningTreePageStyle}>
                    <div className={styles.title}>
                        Learning Tree
                    </div>
                    <div className={styles.mainTreePart}>
                        <Paper className={styles.graphPart}>
                        
                            <Graph
                                id='learningTreeGraph' // id is mandatory, if no id is defined rd3g will throw an error
                                data={this.props.learningTree.learningTree}
                                onClickNode={this.onClickNode}
                                config={myConfig}
                            />
                        </Paper>
                        <Paper className={styles.rightSideBar}>
                            <div className={styles.nodesLegend}>
                                <div className={styles.nodeslegendTitle}> Nodes Legend</div>
                                <div className={styles.nodeRepresentation}>
                                    <div className={styles.nodeRepresentationCircleNotLearnedTopic}></div>
                                    <div className={styles.sideBarCircleTitle}>
                                        Not Learned Topics
                                    </div>
                                </div>
                                <div className={styles.nodeRepresentation}>
                                    <div className={styles.nodeRepresentationCircleLearnedTopic}></div>
                                    <div className={styles.sideBarCircleTitle}>
                                        Learned Topics
                                </div>
                                </div>
                            </div>
                           
                            <FormControl component="fieldset" classes={{ root: styles.selectTreeTypeBody }}>
                                <FormLabel component="legend"
                                    classes={{
                                        root: styles.selectTreeTypeLegend,
                                        label: styles.selectTreeTypeLegend,
                                        focused: styles.selectTreeTypeLegend,
                                        colorSecondary: styles.selectTreeTypeLegend,
                                    }}>Select tree generation type</FormLabel>
                                <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios">
                                    <FormControlLabel value="female" control={
                                        <Radio
                                            checked={this.state.radioButtonSelectedGeneratingOption === "self"}
                                            onChange={this.handleChange}
                                            value="self"
                                            size = "medium"
                                            color="primary"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />} classes={{ root: styles.radioButtonRoot, label: styles.radioButtonLabel }} label="My tree"/>
                                    <FormControlLabel value="female" control={
                                        <Radio
                                            checked={this.state.radioButtonSelectedGeneratingOption === "team"}
                                            onChange={this.handleChange}
                                            value="team"
                                            color="primary"
                                            size="medium"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'B' }}
                                        />} classes={{ root: styles.radioButtonRoot, label: styles.radioButtonLabel }} label="Teams tree"/>
                                </RadioGroup>
                                <Button
                                    classes={{ root: styles.selectTreeTypeButton }}
                                    variant="contained"
                                    color="primary"
                                    disabled={this.state.radioButtonSelectedGeneratingOption != "team"}
                                    onClick={this.onTeamSelectClick}>
                                    Select Team
                                </Button>
                            </FormControl>

                        </Paper>
                    </div>
                    <div>
                        *Click on node to see more information
                    </div>
                </div>
                <TopicLearnedMembersDialog open={this.state.openMembersDialog} currentLearnedUser={this.props.learningTree.learningTreeSelectedUsers} selectedNodeId={this.state.selectedNode} />
                <TeamSelectDialog open={this.state.openTeamDialog} allTeams={usersData}/>
            </div>
        );
    }
}
LearningTree.propTypes = {
    generateLearningTree: PropTypes.func.isRequired,
    setSelectedLearningTreeUsers: PropTypes.func.isRequired,
    learningTree: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    learningTree: state.learningTree,
    token: state.login.token,
    learningTreeSelectedUsers: state.learningTreeSelectedUsers
})

export default connect(mapStateToProps, {
    generateLearningTree, setSelectedLearningTreeUsers, fetchUserLearnedTopics, fetchTeamLearnedTopics, fetchDescendantManagers
})(LearningTree);