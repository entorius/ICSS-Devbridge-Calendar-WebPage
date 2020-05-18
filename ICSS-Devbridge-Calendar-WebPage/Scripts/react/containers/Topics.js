import React from 'react';
import SideBar from "../components/SideBar";
import Topic from "../components/Topic";
import { withStyles } from '@material-ui/core/styles';

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
const gridContainerStyle = {
    margin: 0
};
const pageNameStyle = {
    margin: 15,
    fontWeight: "bold",
    fontSize: 40,
    display: 'inline'
};
const addButtonStyle = {
    borderRadius: 30,
    color: 'red'
};
const addTopicTextStyle = {
    fontSize: 20,
    textAlign: 'right'
};

class Topics extends React.Component {
    state = {
        topics: [ ],
        pageName: "Main topics",
    };

    addTopics(n) {
        let topics = [];
        for (let i = 1; i < n; i++)
            topics.push({ id: i, name: i + " item" });
        this.setState({ topics });
    };

    handleLoadSubtopics = topicID => {
        // ask database for topics subtopics
        this.addTopics(5);
        this.setState({ pageName: topicID });
    };

    componentDidMount() {
        // ask for topics from server
        this.addTopics(15);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SideBar />
                <div>
                    <p style={pageNameStyle}>{this.state.pageName}</p>
                    <p style={addTopicTextStyle}>Add new topic in this section
                        <Button style={this.addButtonStyle}>
                            <AddIcon style={{ fontSize: 40 }} />
                        </Button>
                    </p>
                    <Grid container
                        direction="row"
                        justify="space-around"
                        spacing="8"
                        style={gridContainerStyle}>
                        {this.state.topics.map(topic =>
                            <Topic topic={topic} onLoadSubtopics={this.handleLoadSubtopics} />
                        )}
                    </Grid>
                </div>
            </div>
            );
    }
}

export default withStyles(styles)(Topics);