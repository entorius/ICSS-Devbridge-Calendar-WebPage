import React from 'react';
import SideBar from "../components/SideBar";
import Topic from "../components/Topic";
import { withStyles } from '@material-ui/core/styles';
import classes from "../../../Content/Topics.less";

//Redux
import { connect } from 'react-redux';
import { fetchAssignments } from '../redux/actions/assignmentActions';
import PropTypes from 'prop-types';


// Material UI components
import Grid from '@material-ui/core/Grid';
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
import { checkIfRedirectToLoginPage } from '../functions/LocalStorageFunctions';

const styles = theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexGrowth: 1
    },
    gridContainer: {
        direction: 'row',
        justify: 'space-around',
        alignItems: 'flex-start'
    }
});

class Topics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            pageName: "Main topics",
            topicToChange: {},
            openEditTopic: false,
            openCreateTopic: false,
        };
        this.handleLoadSubtopics = this.handleLoadSubtopics.bind(this);
        this.handleDialogEditTopic = this.handleDialogEditTopic.bind(this);
        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleDialogCreateTopic = this.handleDialogCreateTopic.bind(this);
        this.handleCreateTopic = this.handleCreateTopic.bind(this);
    };

    addTopics(n) {
        let topics = [];
        for (let i = 1; i < n; i++)
            topics.push({
                id: i,
                name: i + " item",
                description: "Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. https://www.stackoverflow.com, www.google.com"
            });
        this.setState({ topics });
    };

    handleLoadSubtopics(topic) {
        // ask database for topic subtopics
        this.addTopics(5);
        this.setState({ pageName: topic.name });
    };

    handleDialogEditTopic(topic) {
        if (topic && topic.id && topic.name && topic.description) {
            this.setState({ topicToChange: topic });
            this.setState({ openEditTopic: true });
        } 
        else
            this.setState({ openEditTopic: false });
    }

    handleTopicChange(dialogName, topic) {
        let topics = this.state.topics;
        for (let i in topics)
            if (topics[i].id === topic.id) {
                if(topic.name)
                    topics[i].name = topic.name;
                if (topic.description)
                    topics[i].description = topic.description;
            }
        this.setState({ topics, [dialogName]: false });
    };

    handleDialogCreateTopic() {
        this.setState({ openCreateTopic: !this.state.openCreateTopic });
    };

    handleCreateTopic(dialogName, topic) { // dialogName is required because the EditTopic calls with two parameters
        this.setState({ openCreateTopic: false });
        //send topic to server and get id, and set topic id here
        let topics = this.state.topics;
        topics.unshift(topic);
        this.setState({ topics: topics });
    }

    componentDidMount() {
        // ask for topics from server
        this.addTopics(15);
        
        checkIfRedirectToLoginPage(this.props);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SideBar />
                <div>
                    <p className={classes.pageNameStyle}>{this.state.pageName}</p>
                    <p className={classes.addTopicTextStyle}>Add new topic in this section
                        <Button className={classes.addButtonStyle}
                            onClick={this.handleDialogCreateTopic}>
                            <AddIcon style={{ fontSize: 40 }} />
                        </Button>
                    </p>
                    <Grid container
                        direction="row"
                        justify="space-around"
                        spacing="8"
                        className={classes.gridContainerStyle}>
                        {this.state.topics.map(topic =>
                            <Topic topic={topic}
                                onLoadSubtopics={this.handleLoadSubtopics}
                                onEditTopic={this.handleDialogEditTopic} />
                        )}
                    </Grid>
                </div>
                <EditTopic open={this.state.openEditTopic}
                    topicToChange={this.state.topicToChange}
                    onTopicChange={this.handleTopicChange}
                    onDialogChange={this.handleDialogEditTopic} />
                <EditTopic open={this.state.openCreateTopic}
                    topicToChange={{}}
                    onTopicChange={this.handleCreateTopic}
                    onDialogChange={this.handleDialogCreateTopic} />
            </div>
            );
    }
}

class EditTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogName: "openEditTopic",
            topic: this.props.topicToChange,
        }
        this.handleTopicChange = this.handleTopicChange.bind(this);
    }

    handleTopicChange(evt) {
        let topic = this.state.topic;
        topic.id = this.props.topicToChange.id;
        topic[evt.target.name] = evt.target.value;
        this.setState({
            topic: topic
        });
    };

    render() {
        return (
            <Dialog onClose={this.props.onDialogChange}
                open={this.props.open}>
                <DialogTitle className={classes.margin10Style}>
                    Edit {this.props.topicToChange.name} topic
                </DialogTitle>
                <div className={classes.margin10Style}>
                    <p>Topic name:</p>
                    <TextField className={classes.margin10Style}
                        variant="outlined"
                        defaultValue={this.props.topicToChange.name}
                        name="name"
                        onChange={this.handleTopicChange} />
                    <p>Topic description:</p>
                    <TextField className={classes.margin10Style}
                        variant="outlined"
                        defaultValue={this.props.topicToChange.description}
                        name="description"
                        onChange={this.handleTopicChange} />
                </div>
                <div className={classes.margin10Style}>
                    <Button className={classes.cancelButton}
                        onClick={this.props.onDialogChange}>
                        Cancel
                    </Button>
                    <Button className={classes.actionButton}
                        onClick={() => this.props.onTopicChange(this.state.dialogName, this.state.topic)}>
                        Change topic information
                    </Button>
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(Topics);