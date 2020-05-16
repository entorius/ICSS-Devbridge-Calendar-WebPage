import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import { withStyles } from '@material-ui/core/styles';
import classes from "../../../Content/Team.less";

//Redux
import { connect } from 'react-redux';
import { fetchTeamTree, changeRestrictionsForUser, changeRestrictionsForTeam, changeGlobalRestrictions, addTeamMember, reassignTeamMember } from '../redux/actions/teamActions';
import PropTypes from 'prop-types';


// Material UI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import PersonIcon from '@material-ui/icons/Person';

class ChangeRestrictionForTeamMemberDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            justOpened: false,
            email: "some@gmail.com",
            name: "",
            restrictionConsecutiveDays: null,
            restrictionDaysPerWeek: null,
            restrictionDaysPerMonth: null,
            restrictionDaysPerYear: null,
            users: [],
            selectedUser: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
    }

    handleChange(evt) {
        // check it out: we get the evt.target.name 
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSelectChange(evt) {
        console.log('handleSelectChange');
        const fullName = evt.target.value;
        const user = this.state.users.find(user => user.FirstName + ' ' + user.LastName == fullName);
        this.setState({
            restrictionConsecutiveDays: user.ConsecLimit, 
            restrictionDaysPerMonth: user.MonthlyLimit,
            restrictionDaysPerYear: user.YearlyLimit,
            selectedUser: user
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ open: true });

            const teamMembers = this.getTeam(this.props.teams, this.props.teamId);
            this.setState({ users: teamMembers.map(member => member.This) });
        }
    }

    handleClose(){
        this.setState({ 
            open: false,
            restrictionConsecutiveDays: null,
            restrictionDaysPerWeek: null,
            restrictionDaysPerMonth: null,
            restrictionDaysPerYear: null
        });
    }

    getTeam(teams, teamId){
        if(teams.$id == teamId){
            return teams.Children;
        }

        var children = [];
        if(teams.children != null){
            for(let child of teams.Children){
                if(Array.isArray(child.Children)){
                    children = this.getTeam(child, teamId);
                    if(children.length > 0){
                        break;
                    }
                }
            }
        }

        return children;
    }

    handleListItemClick() {
        this.setState({ open: false });

        const userData = {
            id: this.state.selectedUser.UserId,
            consecLimit: this.state.restrictionConsecutiveDays,
            monthlyLimit: this.state.restrictionDaysPerMonth,
            yearlyLimit: this.state.restrictionDaysPerYear
        }

        this.props.patchFunc(this.props.token.accessToken, userData)
            .then(() => {
                this.props.updateTreeFunc(this.props.token.accessToken);
            });
    };

    closeDialog() {
        this.setState({ open: false });
    }

    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                <DialogTitle
                    id="change-restriction-dialog-title"
                    disableTypography
                    classes={{ root: classes.changeRestrictionTitle}}>
                    Team member restriction
                    <CreateIcon className={classes.popUpButtonPicture} />
                </DialogTitle>
                <div className={classes.changeRestrictionBody}>
                    <div className={classes.changeRestrictionTeamMemberSelection}>
                        <div className={classes.changeRestrictionTeamMemberSelectionTitle}>Team member</div>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.member}
                            className={classes.changeRestrictionSelectTeamMember}
                            name="member"
                            input={<Input />}
                            onChange={this.handleSelectChange}>
                        >{this.state.users.map(user => (
                            <MenuItem key={user.FirstName + ' ' + user.LastName} value={user.FirstName + ' ' + user.LastName} >
                                {user.FirstName + ' ' + user.LastName}
                            </MenuItem>
                        ))}
                        </Select>
                    </div>
                    <div className={classes.changeRestrictionRestrictionsHeader}>Restrictions</div>
                    <div className={classes.changeRestrictionsRestrictionsBody}>
                        <div className={classes.changeRestrictionsRestriction}>
                            <div className={classes.restrictionLabel}>Consecutive days: </div>
                            <TextField
                                className={classes.restrictionTextField}
                                id="outlined-required"
                                label="Days"
                                type="number"
                                defaultValue="N/A"
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: classes.restrictionFieldRoot,
                                        focused: classes.restrictionFieldRoot
                                    }
                                }}
                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                variant="outlined"
                                name="restrictionConsecutiveDays"
                                value={this.state.restrictionConsecutiveDays}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={classes.changeRestrictionsRestriction}>
                            <div className={classes.restrictionLabel}>Days per week: </div>
                            <TextField
                                id="outlined-required"
                                className={classes.restrictionTextField}
                                label="Days"
                                type="number"
                                defaultValue="N/A"
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: classes.restrictionFieldRoot,
                                        focused: classes.restrictionFieldRoot
                                    }
                                }}
                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                variant="outlined"
                                name="restrictionDaysPerWeek"
                                value={this.state.restrictionDaysPerWeek}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={classes.changeRestrictionsRestriction}>
                            <div className={classes.restrictionLabel}>Days per month: </div>
                            <TextField
                                id="outlined-required"
                                className={classes.restrictionTextField}
                                label="Days"
                                type="number"
                                defaultValue="N/A"
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: classes.restrictionFieldRoot,
                                        focused: classes.restrictionFieldRoot
                                    }
                                }}
                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                variant="outlined"
                                name="restrictionDaysPerMonth"
                                value={this.state.restrictionDaysPerMonth}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={classes.changeRestrictionsRestriction}>
                            <div className={classes.restrictionLabel}>Days per year: </div>
                            <TextField
                                id="outlined-required"
                                className={classes.restrictionTextField}
                                label="Days"
                                type="number"
                                defaultValue="N/A"
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: classes.restrictionFieldRoot,
                                        focused: classes.restrictionFieldRoot
                                    }
                                }}
                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                variant="outlined"
                                name="restrictionDaysPerYear"
                                value={this.state.restrictionDaysPerYear}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.changeRestrictionButtons}>
                    <Button
                        className={classes.cancelButton}
                        classes={{ label: classes.popUpButtonLabel }}
                        onClick={() => {this.closeDialog()}}>
                        Cancel
                    </Button>
                    {/* TODO: Add action to change selected member restriction*/}
                    <Button
                        className={classes.actionButton}
                        classes={{ label: classes.popUpButtonLabel }}
                        onClick={this.handleListItemClick}>
                        Change member restrictions
                    </Button>
                </div>
            </Dialog>
        );
    }
}

class AddNewTeamMemberDialog extends React.Component {
    constructor(props) {
        super(props);
        {/* TODO: state for adding team member*/ }
        this.state = {
            open: props.open,
            email: "some@gmail.com"
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        // check it out: we get the evt.target.name 
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }
    componentDidUpdate(prevProps) {
        //if props for this class updated open dialog
        if (this.props.open !== prevProps.open) {

            this.setState({ open: true });
        }
    }

    handleListItemClick = (email) => {
        this.props.addFunc(this.props.token.accessToken, email, this.props.currentUser.UserId);
        this.setState({ open: false })
    };

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
                classes={{ paper: classes.addMemberDialog }}>
                <DialogTitle
                    id="change-restriction-dialog-title"
                    disableTypography
                    classes={{ root: classes.addTeamMemberTitle }}>
                    Add new member
                    <AddIcon className={classes.popUpButtonPicture} />
                </DialogTitle>
                <div className={classes.addMemberBody}>
                   
                  
                    <TextField
                        id="input-email-with-icon"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        InputLabelProps={{
                            classes: {
                                root: classes.resize
                            }
                        }}
                        label="Email"
                        name="email"
                        onChange={this.handleChange}
                        className={classes.addMemberEmail} />
                       
                   
                </div>
                <div className={classes.addMemberButtons}>
                    <Button
                        className={classes.cancelButton}
                        classes={{ label: classes.popUpButtonLabel }}
                        onClick={() => this.closeDialog(this.state.email)}>
                        Cancel
                    </Button>
                    {/* TODO: add action to send invitation to email*/}
                    <Button
                        className={classes.actionButton}
                        classes={{ label: classes.popUpButtonLabel }}
                        onClick={() => this.handleListItemClick(this.state.email)}>
                        Send invitation
                    </Button>
                </div>
            </Dialog>
        );
    }
}

class DeleteTeamMemberDialog extends React.Component {
    constructor(props) {
        super(props);
        {/* TODO: parameters for deleting member:   member- member name*/ }
        this.state = {
            open: props.open,
            member: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        // check it out: we get the evt.target.name 
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }
    componentDidUpdate(prevProps) {
        //if props for this class updated open dialog
        if (this.props.open !== prevProps.open) {

            this.setState({ open: true });
        }
    }
    render() {
        const names = [
            'Oliver Hansen',
            'Van Henry',
            'April Tucker',
            'Ralph Hubbard',
            'Omar Alexander',
            'Carlos Abbott',
            'Miriam Wagner',
            'Bradley Wilkerson',
            'Virginia Andrews',
            'Kelly Snyder',
        ];
        //event to handle close (closes dialog)
        const handleClose = () => {
            this.setState({ open: false });
        };

        //event to handle close (closes dialog)
        const handleListItemClick = (value) => {
            this.setState({ open: false })
        };

        return (
            <Dialog onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={this.state.open}
                classes={{ paper: classes.addMemberDialog }}>
                <DialogTitle
                    id="change-restriction-dialog-title"
                    disableTypography
                    classes={{ root: classes.deleteMemberTitle }}>
                    Remove team member
                    <CloseIcon className={classes.popUpButtonPicture} />
                </DialogTitle>
                <div className={classes.deleteMemberBody}>

                    <div className={classes.deleteMemberTeamMemberTitle}>Select team member</div>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.member}
                        className={classes.deleteMemberSelectTeamMember}
                        name="member"
                        input={<Input />}
                        onChange={this.handleChange}>
                    >{names.map((name) => (
                        <MenuItem key={name} value={name} >
                            {name}
                        </MenuItem>
                    ))}
                    </Select>


                </div>
                <div className={classes.deleteMemberButtons}>
                    <Button
                        className={classes.cancelButton}
                        classes={{ label: classes.popUpButtonLabel }}
                        onClick={() => handleListItemClick(this.email)}>
                        Cancel
                    </Button>
                    {/* TODO: add action to delete member from the team*/}
                    <Button
                        className={classes.actionButton}
                        classes={{ label: classes.popUpButtonLabel }}
                        onClick={() => handleListItemClick(this.email)}>
                        Remove team member
                    </Button>
                </div>
            </Dialog>
        );
    }
}

class ReassignTeamMemberDialog extends React.Component {
    constructor(props) {
        super(props);
        {/* TODO: state parameters for reassigning team member: member- member name, team- team name*/ }
        this.state = {
            open: props.open,
            member: "",
            team: "",
            teams: [],
            teamMembers: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
    }
    handleChange(evt) {
        // check it out: we get the evt.target.name 
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }
    componentDidUpdate(prevProps) {
        //if props for this class updated open dialog
        if (this.props.open !== prevProps.open) {
            this.setState({ open: true });

            const teamMembers = this.getTeam(this.props.teams, this.props.teamId);
            this.setState({ teamMembers: teamMembers.map(member => member.This) });
            this.getAllTeams(this.props.teams);
        }
    }

    getTeam(teams, teamId){
        if(teams.$id == teamId){
            return teams.Children;
        }

        var children = [];
        if(teams.Children != null){
            for(let child of teams.Children){
                if(Array.isArray(child.Children)){
                    children = this.getTeam(child, teamId);
                    if(children.length > 0){
                        break;
                    }
                }
            }
        }
        return children;
    }

    getAllTeams(teamTree) {
        this.state.teams.push(teamTree);

        if(Array.isArray(teamTree.Children)){
            teamTree.Children.forEach(child => {
                this.getAllTeams(child);
            })
        }
    }

    
    updateUser(teams, user) {
        if(teams.This.UserId == user.UserId){
            teams.This = user;
            return teams;
        }

        if(teams.Children != null){
            for(let child of teams.Children){
                let updatedChild = this.updateUser(child, user);
                teams.Children[teams.Children.indexOf(child)] = updatedChild;
            }
        }

        return teams;
    }
    
    handleClose() {
        this.setState({ open: false, teams: [] });
    };

    handleListItemClick(evt) {
        if(this.state.team != "" && this.state.member != ""){
            const user = this.state.teamMembers.find(user => user.FirstName + ' ' + user.LastName == this.state.member);
            const manager = this.state.teams.find(team => team.This.FirstName + ' ' + team.This.LastName == this.state.team);
    
            const data = { userId: user.UserId, managerId: manager.This.UserId }
    
            this.props.reassignFunc(this.props.token.accessToken, data).then(() => {
                if(this.props.error === null) {
                    //update the state
                    this.props.updateTreeFunc(this.props.token.accessToken);

                    this.handleClose();
                }
                else {
                    console.log('lole');
                    console.log(this.props.error);
                    for(let error of this.props.error){
                        if(error.Code == 4){
                            // TODO: Add a message about circular relationships
                        }
                    }
                    this.props.error = [];
                }
            });
        }
    };

    render() {
        return (
            <Dialog onClose={() => this.handleClose}
                aria-labelledby="simple-dialog-title"
                open={this.state.open}
                classes={{ paper: classes.addMemberDialog }}>
                <DialogTitle
                    id="change-restriction-dialog-title"
                    disableTypography
                    classes={{ root: classes.reassignMemberHeader }}
                    >
                    Reassign team member
                    <CompareArrowsIcon className={classes.popUpButtonPicture} />
                </DialogTitle>
                <div className={classes.reassignTeamBody}>

                    <div className={classes.reassignTeamTitle}>Select team member</div>
                    <Select
                        labelId="member-select-label"
                        id="member-select"
                        value={this.state.member}
                        className={classes.deleteMemberSelectTeamMember}
                        name="member"
                        input={<Input/>}
                        onChange={this.handleChange}>
                        {this.state.teamMembers.map((member) => (
                            <MenuItem key={member.FirstName + ' ' + member.LastName} value={member.FirstName + ' ' + member.LastName} >
                                {member.FirstName + ' ' + member.LastName}
                            </MenuItem>
                        ))}
                    </Select>

                </div>
                <div className={classes.deleteMemberBody}>
                    <div className={classes.reassignTeamTitle}>Select team</div>
                    <Select
                        labelId="team-select-label"
                        id="team-select"
                        value={this.state.team}
                        className={classes.deleteMemberSelectTeamMember}
                        name="team"
                        input={<Input />}
                        onChange={this.handleChange}>
                        {this.state.teams.map((team) => (
                            <MenuItem key={team.$id} value={team.This.FirstName + ' ' + team.This.LastName}>
                                {team.This.FirstName + ' ' + team.This.LastName + '\'s team'}
                            </MenuItem>
                        ))}
                    </Select>

                </div>
                <div className={classes.reassignTeamButtons}>
                    <Button
                        className={classes.cancelButton}
                        classes={{ label: classes.popUpButtonLabel }}
                        onClick={() => {this.handleClose()}}>
                        Cancel
                    </Button>
                    <Button
                        className={classes.actionButton}
                        classes={{ label: classes.popUpButtonLabel }}
                        onClick={this.handleListItemClick}>
                        Reassign team member
                    </Button>
                </div>
            </Dialog>
        );
    }
}

class Team extends React.Component {
    constructor(props) {
        super(props);
        {/* TODO: state parameters for changin team , global restrictions, */ }
        this.state = {
            teamRestrictionConsecutiveDays: 0,
            teamRestrictionDaysPerWeek: 0,
            teamRestrictionDaysPerMonth: 0,
            teamRestrictionDaysPerYear: 0,
            globalRestrictionConsecutiveDays: 0,
            globalRestrictionDaysPerWeek: 0,
            globalRestrictionDaysPerMonth: 0,
            globalRestrictionDaysPerYear: 0,
            checkedRememberMe: true,
            openChangeRestrictionForTeamMemberDialog: false,
            openAddTeamMemberDialog: false,
            openRemoveTeamMemberDialog: false,
            openReassignTeamMemberDialog: false,
            selectedTeamId: this.props.teamTree.items.$id,
            selectedTeamManagerId: 0,
            teamMemberTreeContent: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
    }

    async componentDidMount() {
        await this.props.fetchTeamTree(this.props.token.accessToken)
            .then(() => {
                console.log(this.props.teamTree)
            });
        
        if (this.state.selectedTeamId != this.props.teamTree.items.$id) {
            this.setState({ selectedTeamId: this.props.teamTree.items.$id, selectedTeamManagerId: this.props.teamTree.items.This.UserId })
        }

        this.setState({ teamMemberTreeContent: this.renderTree(this.props.teamTree.items, this.props.teamTree.items.$id) });
    }
    
    handleChange(evt) {
        // check it out: we get the evt.target.name 
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleOpenDialog(evt) {
        var value = !this.state[evt.currentTarget.name];
        this.setState({ [evt.currentTarget.name]: value });
    }

    onTeamClick = (node) => {
        console.log(node);
        this.setState({ selectedTeamId: node.$id, selectedTeamManagerId: node.This.UserId });
        this.setState({ teamMemberTreeContent: this.renderTree(node, node.$id) })
    }

    changeTeamRestrictions() {
        var data = {
            managerId: this.state.selectedTeamManagerId,
            consecLimit: this.state.teamRestrictionConsecutiveDays,
            monthlyLimit: this.state.teamRestrictionDaysPerMonth,
            yearlyLimit: this.state.teamRestrictionDaysPerYear
        };

        this.props.changeRestrictionsForTeam(this.props.token.accessToken, data)
            .then(() => {
                this.props.fetchTeamTree(this.props.token.accessToken);
            });
    }

    changeGlobalRestrictions() {
        var data = {
            consecLimit: this.state.globalRestrictionConsecutiveDays,
            monthlyLimit: this.state.globalRestrictionDaysPerMonth,
            yearlyLimit: this.state.globalRestrictionDaysPerYear
        };

        this.props.changeGlobalRestrictions(this.props.token.accessToken, data)
            .then(() => {
                this.props.fetchTeamTree(this.props.token.accessToken);
            });
    }

    renderTree = (nodes, nodeId) => {
        console.log(nodeId)
        if (nodeId >= 0) {
            // var selectedTeam = this.findSelectedTeamNode(nodes, nodeId);
            return (
                <TreeItem key={nodeId}
                    nodeId={nodeId}
                    label={nodes.This.FirstName + "'s team"}
                    classes={{
                        root: classes.treeItem, // class name, e.g. `classes-nesting-root-x`
                        label: classes.treeItem, // class name, e.g. `classes-nesting-label-x`
                    }}>
                    {/* BUGGED */}
                    {Array.isArray(nodes.Children) ? nodes.Children.map((node) => this.renderTeamMember(node)) : null}
                </TreeItem>
            );
        }
        else {
            return (
                <div>
                    No team selected
                </div>
            );
        }
    };

    renderTeamMember = (node) => {
        return (
            <TreeItem key={node.This.UserId}
                nodeId={node.This.UserId}
                label={node.This.FirstName }
                classes={{
                    root: classes.treeItem, // class name, e.g. `classes-nesting-root-x`
                    label: classes.treeItem, // class name, e.g. `classes-nesting-label-x`
                }}>
                <TreeItem key={node.This.UserId + " ConsecLimit"}
                    nodeId={node.This.UserId + " ConsecLimit"}
                    label={node.This.ConsecLimit === null ? "Consecutive days:  N/A" :"Consecutive days: " + node.This.ConsecLimit.toString() }
                    classes={{
                        root: classes.treeItem, // class name, e.g. `classes-nesting-root-x`
                        label: classes.treeItem, // class name, e.g. `classes-nesting-label-x`
                    }}>
                
                </TreeItem>
                <TreeItem key={node.This.UserId + " MonthlyLimit"}
                    nodeId={node.This.UserId + " MonthlyLimit"}
                    label={node.This.MonthlyLimit === null ? "Days per month:  N/A" : "Days per month: " + node.This.MonthlyLimit.toString()}
                    classes={{
                        root: classes.treeItem, // class name, e.g. `classes-nesting-root-x`
                        label: classes.treeItem, // class name, e.g. `classes-nesting-label-x`
                    }}>
                
                </TreeItem>
                <TreeItem key={node.This.UserId + " QuaterLimit"}
                    nodeId={node.This.UserId + " QuaterLimit"}
                    label={node.This.MonthlyLimit === null ? "Days per quater:  N/A" : "Days per quater: " + node.This.MonthlyLimit.toString()}
                    classes={{
                        root: classes.treeItem, // class name, e.g. `classes-nesting-root-x`
                        label: classes.treeItem, // class name, e.g. `classes-nesting-label-x`
                    }}>
                
                </TreeItem>
                <TreeItem key={node.This.UserId + " YearlyLimit"}
                    nodeId={node.This.UserId + " YearlyLimit"}
                    label={node.This.YearlyLimit === null ? "Days per year:  N/A" : "Days per year: " + node.This.YearlyLimit.toString()}
                    classes={{
                        root: classes.treeItem, // class name, e.g. `classes-nesting-root-x`
                        label: classes.treeItem, // class name, e.g. `classes-nesting-label-x`
                    }}>
                </TreeItem>
            </TreeItem>
        );
    }

    render() {
        const renderSidebarTree = (nodes) => {
            return (
                <TreeItem key={nodes.length === 0 ? 0 : nodes.This.UserId}
                        nodeId={nodes.length === 0 ? 0 : nodes.This.UserId}
                        label={nodes.length === 0 ? "no team" : nodes.This.FirstName + "'s team"}
                        onClick={() => { this.onTeamClick(nodes); }}
                        classes={{
                        root: classes.sidebarTreeItem, // class name, e.g. `classes-nesting-root-x`
                        label: classes.sidebarTreeItem, // class name, e.g. `classes-nesting-label-x`
                    }}>
                    {Array.isArray(nodes.Children) ? nodes.Children.map(node => Array.isArray(node.Children) ? renderSidebarTree(node) : null) : null}
                </TreeItem>

            )
        };

        return (
            <div className={classes.mainPage} >
                <SideBar />
                <div className={classes.teamPageStyle}>
                    <div className={classes.mainContent}>

                        <div className={classes.title}>Team not selected</div>
                        <div className={classes.popUpButtonsAndTeamMembers}>
                            <div className={classes.teamInfo}>

                                <div className={classes.teamTitle}>Team members and their restrictions</div>
                                <TreeView
                                    className={classes.teamMembersTree}
                                    children={this.state.teamMemberTreeContent}
                                    defaultExpanded={['root']}
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                />
                                <Button
                                    className={classes.changeRestrictionButton}
                                    classes={{ label: classes.popUpButtonLabel }}
                                    name="openChangeRestrictionForTeamMemberDialog"
                                    onClick={this.handleOpenDialog}>
                                    Change restrictions for team member
                                     <CreateIcon className={classes.popUpButtonPicture} />
                                </Button>

                            </div>
                            <div className={classes.popUpButtonsGroup}>

                                <Button className={classes.addNewMemberButton}
                                    classes={{ label: classes.popUpButtonLabel }}
                                    name="openAddTeamMemberDialog"
                                    onClick={this.handleOpenDialog}>
                                    Add new team member 
                                    <AddIcon className={classes.popUpButtonPicture} />
                                </Button>
                                <Button className={classes.removeMemberButton}
                                    classes={{ label: classes.popUpButtonLabel }}
                                    name="openRemoveTeamMemberDialog"
                                    onClick={this.handleOpenDialog}>
                                    Remove team member 
                                    <CloseIcon className={classes.popUpButtonPicture} />
                                </Button>
                                <Button className={classes.reassignMemberButton}
                                    classes={{ label: classes.popUpButtonLabel }}
                                    name="openReassignTeamMemberDialog"
                                    onClick={this.handleOpenDialog}>
                                    Reassign team member 
                                    <CompareArrowsIcon className={classes.popUpButtonPicture} />
                                </Button>

                            </div>
                        </div>
                        <div className={classes.restrictions}>

                            <div className={classes.teamRestrictions}>

                                <div className={classes.restrictionsHeader}>
                                    Team restrictions
                                </div>
                                <div className={classes.restrictions}>
                                    <div className={classes.restrictionsBody}>
                                        <div className={classes.restriction}>
                                            <div className={classes.restrictionLabel}>Consecutive days: </div>
                                            <TextField
                                                id="outlined-required"
                                                className={classes.restrictionTextField}
                                                label="Days"
                                                type="number"
                                                defaultValue="N/A"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.restrictionFieldRoot,
                                                        focused: classes.restrictionFieldRoot
                                                    }
                                                }}
                                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                                variant="outlined"
                                                name="teamRestrictionConsecutiveDays"
                                                value={this.state.teamRestrictionConsecutiveDays}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className={classes.restriction}>
                                            <div className={classes.restrictionLabel}>Days per week: </div>
                                            <TextField
                                                id="outlined-required"
                                                className={classes.restrictionTextField}
                                                label="Days"
                                                type="number"
                                                defaultValue="N/A"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.restrictionFieldRoot,
                                                        focused: classes.restrictionFieldRoot
                                                    }
                                                }}
                                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                                variant="outlined"
                                                name="teamRestrictionDaysPerWeek"
                                                value={this.state.teamRestrictionDaysPerWeek}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className={classes.restriction}>
                                            <div className={classes.restrictionLabel}>Days per month: </div>
                                            <TextField
                                                id="outlined-required"
                                                className={classes.restrictionTextField}
                                                label="Days"
                                                type="number"
                                                defaultValue="N/A"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.restrictionFieldRoot,
                                                        focused: classes.restrictionFieldRoot
                                                    }
                                                }}
                                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                                variant="outlined"
                                                name="teamRestrictionDaysPerMonth"
                                                value={this.state.teamRestrictionDaysPerMonth}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className={classes.restriction}>
                                            <div className={classes.restrictionLabel}>Days per year: </div>
                                            <TextField
                                                id="outlined-required"
                                                className={classes.restrictionTextField}
                                                label="Days"
                                                type="number"
                                                defaultValue="N/A"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.restrictionFieldRoot,
                                                        focused: classes.restrictionFieldRoot
                                                    }
                                                }}
                                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                                variant="outlined"
                                                name="teamRestrictionDaysPerYear"
                                                value={this.state.teamRestrictionDaysPerYear}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <Button className={classes.restrictionButton} classes={{ label: classes.popUpButtonLabel }} onClick={() => {this.changeTeamRestrictions()}}>
                                        Change restrictions
                                        for your team
                                    <CreateIcon className={classes.popUpButtonPicture} />
                                    </Button>
                                </div>

                            </div>
                            <div className={classes.globalRestrictions}>

                                <div className={classes.restrictionsHeader}>
                                    Global restrictions
                                </div>
                                <div className={classes.restrictions}>
                                    <div className={classes.restrictionsBody}>
                                        <div className={classes.restriction}>
                                            <div className={classes.restrictionLabel}>Consecutive days: </div>
                                            <TextField
                                                className={classes.restrictionTextField}
                                                id="outlined-required"
                                                label="Days"
                                                type="number"
                                                defaultValue="N/A"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.restrictionFieldRoot,
                                                        focused: classes.restrictionFieldRoot
                                                    }
                                                }}
                                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                                variant="outlined"
                                                name="globalRestrictionConsecutiveDays"
                                                value={this.state.globalRestrictionConsecutiveDays}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className={classes.restriction}>
                                            <div className={classes.restrictionLabel}>Days per week: </div>
                                            <TextField
                                                id="outlined-required"
                                                className={classes.restrictionTextField}
                                                label="Days"
                                                type="number"
                                                defaultValue="N/A"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.restrictionFieldRoot,
                                                        focused: classes.restrictionFieldRoot
                                                    }
                                                }}
                                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                                variant="outlined"
                                                name="globalRestrictionDaysPerWeek"
                                                value={this.state.globalRestrictionDaysPerWeek}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className={classes.restriction}>
                                            <div className={classes.restrictionLabel}>Days per month: </div>
                                            <TextField
                                                id="outlined-required"
                                                className={classes.restrictionTextField}
                                                label="Days"
                                                type="number"
                                                defaultValue="N/A"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.restrictionFieldRoot,
                                                        focused: classes.restrictionFieldRoot
                                                    }
                                                }}
                                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                                variant="outlined"
                                                name="globalRestrictionDaysPerMonth"
                                                value={this.state.globalRestrictionDaysPerMonth}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className={classes.restriction}>
                                            <div className={classes.restrictionLabel}>Days per year: </div>
                                            <TextField
                                                id="outlined-required"
                                                className={classes.restrictionTextField}
                                                label="Days"
                                                type="number"
                                                defaultValue="N/A"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.restrictionFieldRoot,
                                                        focused: classes.restrictionFieldRoot
                                                    }
                                                }}
                                                InputProps={{ classes: { root: classes.restrictionFieldRoot } }}
                                                variant="outlined"
                                                name="globalRestrictionDaysPerYear"
                                                value={this.state.globalRestrictionDaysPerYear}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    {/*TODO: Add action to change restrictions globaly for all members according to state parameters*/}
                                    <Button className={classes.restrictionButton} classes={{ label: classes.popUpButtonLabel }} onClick={() => {this.changeGlobalRestrictions()}}>
                                        Change restrictions globally
                                    <CreateIcon className={classes.popUpButtonPicture} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.rightSidebar}>

                        <div className={classes.titleSidebar}>Teams</div>
                        <TreeView
                            className={classes.sideBarTeamsTree}
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpanded={['root']}
                            defaultExpandIcon={<ChevronRightIcon />}
                        >
                           
                            {renderSidebarTree(this.props.teamTree.items )}
                        </TreeView>

                    </div>


                </div>
                <ChangeRestrictionForTeamMemberDialog open={this.state.openChangeRestrictionForTeamMemberDialog} patchFunc={this.props.changeRestrictionsForUser} token={this.props.token} teams={this.props.teamTree.items} teamId={this.state.selectedTeamId} updateTreeFunc={this.props.fetchTeamTree} />
                <AddNewTeamMemberDialog open={this.state.openAddTeamMemberDialog} addFunc={this.props.addTeamMember} currentUser={this.props.teamTree.items.This} token={this.props.token} />
                <DeleteTeamMemberDialog open={this.state.openRemoveTeamMemberDialog} />
                <ReassignTeamMemberDialog open={this.state.openReassignTeamMemberDialog} reassignFunc={this.props.reassignTeamMember} teams={this.props.teamTree.items} teamId={this.state.selectedTeamId} error={this.props.teamTree.error} updateTreeFunc={this.props.fetchTeamTree} token={this.props.token} />
            </div>
        );
    }
}

Team.propTypes = {
    fetchTeamTree: PropTypes.func.isRequired,
    teamTree: PropTypes.array.isRequired,
    changeRestrictionsForUser: PropTypes.func.isRequired,
    changeRestrictionsForTeam: PropTypes.func.isRequired,
    changeGlobalRestrictions: PropTypes.func.isRequired,
    addTeamMember: PropTypes.func.isRequired,
    reassignTeamMember: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    teamTree: state.teamTree,
    token: state.login.token
})

export default connect(
    mapStateToProps, 
    { 
        fetchTeamTree, 
        changeRestrictionsForUser, 
        changeRestrictionsForTeam, 
        changeGlobalRestrictions,
        addTeamMember,
        reassignTeamMember
    }
)(Team);