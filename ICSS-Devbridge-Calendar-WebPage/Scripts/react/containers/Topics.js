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
    GridContainer: {
        direction: 'row',
        justify: 'space-around',
        alignItems: 'flex-start'
    }
});
const GridContainerStyle = {
    margin: 0
}

class Topics extends React.Component {
    state = {
        topics: [
            { id: 0, name: "item0" },
            { id: 1, name: "item1" },
            { id: 2, name: "item2" }
        ]
    };

    AddTopics() {
        let topics = this.state.topics;
        for (let i = 1; i < 15; i++)
            topics.push({ id: i, name: i + " item" });
        this.setState({ topics });
    };

    componentDidMount() {
        // ask for topics from server
        this.AddTopics();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SideBar />
                <Grid container direction="row" justify="space-around" spacing="8" style={GridContainerStyle}>
                    {this.state.topics.map(topic =>
                        <Topic name={topic.name} topicID={topic.id} />
                    )}
                </Grid>
            </div>
            );
    }
}

export default withStyles(styles)(Topics);