import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../Content/LearningTree.less";
import { checkIfRedirectToLoginPage } from '../functions/LocalStorageFunctions';
//Redux
import { connect } from 'react-redux';
import {
    generateLearningTree, setSelectedLearningTreeUsers, fetchUserLearnedTopics, fetchTeamLearnedTopics,
    fetchDescendantManagers, selectManager, fetchAllTopics, resetData
} from '../redux/actions/learningTreeActions';
import {
    fetchCurrentUser
} from '../redux/actions/userActions';
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
        label = "Root";
    }
    else {
        label = node.topic + '\n Learned members: ' + node.learnedMembers;
    }
    return label;
}

const myConfig = {
    nodeHighlightBehavior: true,
    staticGraphWithDragAndDrop: true,
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

    componentDidMount(){
        checkIfRedirectToLoginPage(this.props);
    }

    componentDidUpdate(prevProps) {
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
                open={this.state.open}
                classes={{ paper: styles.nodeDialogStyles } }>
                <DialogTitle
                    id="change-restriction-dialog-title"
                    disableTypography
                    classes={{ root: styles.topicLearnedMembersTitle }}>
                    Learned members
                    <PersonIcon className={styles.popUpButtonPicture} />
                </DialogTitle>
                <div>
                    <Grid item xs={12} md={6} className={styles.usersListGrid}>
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
                                            classes={{ primary: styles.nodeMembersLearnedTopicsMemberLabel}}
                                        >
                                            <div className={styles.listItemNameStyle}>
                                                {user.FirstName} {user.LastName}
                                            </div>
                                            <div className={styles.listItemRoleStyle}>
                                                {user.Role}
                                            </div>
                                        </ListItemText>
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
            user: 0,
            dense: true,
            secondary: false,
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(evt) {
        var name = evt.target.value;
        this.setState(prevState => ({ ...prevState, [evt.target.name]: name }), () => {
            
        });
    }
    componentDidUpdate(prevProps) {
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
            this.props.allProps.selectManager(this.state.user);
            this.props.allProps.fetchTeamLearnedTopics(this.props.allProps.token.accessToken, this.props.allProps.learningTree.selectedManager.UserId)
                .then(() => {
                    this.props.allProps.generateLearningTree(this.props.allProps.learningTree.fetchedTeamTopics, this.props.allProps.learningTree.allTopics);
                });
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
                        value={this.state.userId}
                        className={styles.selectTeam}
                        name="user"
                        input={<Input />}
                        onChange={this.handleChange}>
                        >{this.props.allTeams.map((user) => (
                            <MenuItem key={user.UserId} value={user} primaryText="${user.LastName}">
                                {user.FirstName} {user.LastName} {user.Role} Team
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
            selectedNode: 0,
            teamState: "My Learning Tree"

        };
    }
    async componentDidMount() {
        this.props.resetData();
        await this.props.fetchDescendantManagers(this.props.token.accessToken);
        await this.props.fetchCurrentUser(this.props.token.accessToken);
        this.props.selectManager(this.props.users.user);
        await this.props.fetchUserLearnedTopics(this.props.token.accessToken, this.props.learningTree.selectedManager.UserId);
        await this.props.fetchAllTopics(this.props.token.accessToken);
        var userData = [this.props.learningTree.fetchedUserTopic];
        this.props.setSelectedLearningTreeUsers(userData);
        this.props.generateLearningTree(userData, this.props.learningTree.allTopics);
    }
    componentDidUpdate(prevProps) {
        if (this.props.learningTree.selectedManager !== prevProps.learningTree.selectedManager) {

            if (this.state.radioButtonSelectedGeneratingOption === "team") {
                this.setState({ teamState: this.props.learningTree.selectedManager.FirstName + " " + this.props.learningTree.selectedManager.LastName + " Team Learning Tree" });
            }
        }
    
        
    }
    resetMemberDialogState() {
        this.setState({ ...this.state, openMembersDialog: false }
        );
    }
    onClickNode = nodeId => {
        this.setState({ openMembersDialog: false }, () => {
            var localLearnedUsers = [];
            if (this.state.radioButtonSelectedGeneratingOption == "team") {
                this.props.learningTree.fetchedTeamTopics.map(user =>
                    user.Topics.map((top) => {
                        top.TopicId == nodeId ? localLearnedUsers.push(user.User) : "nothing";
                    }));
            }
            else if (this.state.radioButtonSelectedGeneratingOption == "self") {
                this.props.learningTree.fetchedUserTopic.Topics.map((top) => {
                    top.TopicId == nodeId ? localLearnedUsers.push(this.props.learningTree.fetchedUserTopic.User) : "nothing";
                });
            }
            this.props.setSelectedLearningTreeUsers(localLearnedUsers);
            this.setState({
                selectedNode: nodeId,
                openMembersDialog: true
            });
        })
    };
    handleChange = async evt => {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        var userData = [this.props.learningTree.fetchedUserTopic];
        this.setState({ radioButtonSelectedGeneratingOption: evt.target.value }, () => {
            if (this.state.radioButtonSelectedGeneratingOption === "self") {
                this.props.generateLearningTree(userData, this.props.learningTree.allTopics);
                this.setState({ teamState: "My Learning Tree" });
            }
            else if (this.state.radioButtonSelectedGeneratingOption === "team") {
                this.props.fetchTeamLearnedTopics(this.props.token.accessToken, this.props.learningTree.selectedManager.UserId)
                    .then(() => {
                        this.props.generateLearningTree(this.props.learningTree.fetchedTeamTopics, this.props.learningTree.allTopics);
                        this.setState({ teamState: this.props.learningTree.selectedManager.FirstName + " " + this.props.learningTree.selectedManager.LastName + " Team Learning Tree" });
                    });
                    
            }
        });
    }
    onTeamSelectClick = evt => {
        this.setState({ openTeamDialog: false }, () => {
            this.setState({ openTeamDialog: true })
        });
    }
    
    render() {
        return (
            <div className={styles.mainPage} >
                <SideBar />
                <div className={styles.LearningTreePageStyle}>
                    <div className={styles.title}>
                        <div className={styles.subtitle1}>
                            Learning Tree
                        </div>
                        <div className={styles.subtitle2}>
                            {this.state.teamState}
                        </div>
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
                <TeamSelectDialog open={this.state.openTeamDialog} allTeams={this.props.learningTree.fetchedDescendantManagers} allProps={this.props}/>
            </div>
        );
    }
}
LearningTree.propTypes = {
    generateLearningTree: PropTypes.func.isRequired,
    setSelectedLearningTreeUsers: PropTypes.func.isRequired,
    learningTree: PropTypes.array.isRequired,
    fetchUserLearnedTopics: PropTypes.func.isRequired,
    fetchTeamLearnedTopics: PropTypes.func.isRequired,
    fetchDescendantManagers: PropTypes.func.isRequired,
    selectManager: PropTypes.func.isRequired,
    fetchAllTopics: PropTypes.func.isRequired,
    resetData: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    learningTree: state.learningTree,
    token: state.login.token,
    learningTreeSelectedUsers: state.learningTreeSelectedUsers,
    users: state.users
})

export default connect(mapStateToProps, {
    generateLearningTree, setSelectedLearningTreeUsers, fetchUserLearnedTopics, fetchTeamLearnedTopics, fetchDescendantManagers,
    selectManager, fetchAllTopics, resetData, fetchCurrentUser
})(LearningTree);