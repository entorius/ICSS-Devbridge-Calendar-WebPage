import React from 'react';
import SideBar from "../components/SideBar";
import Topic from "../components/Topic";
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import classes from "../../../Content/Topics.less";
import CreateTopicDialog from '../components/topicDialogs/CreateTopicDialog';
import { grey, indigo, green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import { checkIfRedirectToLoginPage } from '../functions/LocalStorageFunctions';
import { connect } from 'react-redux';
import { fetchTopics } from '../redux/actions/topicActions';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex'
    }
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: indigo[900]
        },
        secondary: {
            main: green[700]
        },
        textPrimary: grey
    }
});

class Topics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            isLoading: false,
            pageName: "Main topics",
            topicToChange: {},
            openEditTopic: false,
            openCreateTopic: false,
            path: [{ name: "Main topics", id: null }]
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
        let subtopics = this.props.topics.filter(t => t.ParentTopicId === topic.TopicId)
        let newPathTopic = { name: topic.Name, id: topic.TopicId }
        this.setState({ topics: subtopics, path: [...this.state.path, newPathTopic] });
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
                if (topic.name)
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

    async componentDidMount() {
        this.setState({ isLoading: true })
        await this.props.fetchTopics(this.props.token.accessToken)
            .then(() => {
                console.log("topics: " + this.props.topics)
                let mainTopics = this.props.topics.filter(t => t.ParentTopicId === null)
                this.setState({ topics: mainTopics, isLoading: false })
            });
        checkIfRedirectToLoginPage(this.props);
    };

    handlePathClicked = (path) => {
        let subtopics = this.props.topics.filter(t => t.ParentTopicId === path.id)
        this.setState({ topics: subtopics });
        let pathIndex = this.state.path.findIndex(p => p.id === path.id);
        console.log("pathIndex" + path.name + " " + path.id + " " + pathIndex)
        let newPath = this.state.path.slice(0, pathIndex + 1)
        this.setState({ path: newPath });
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <SideBar />
                    <Grid
                        container
                        direction="column"
                        alignItems="flex-start"
                        style={{ padding: "15px", backgroundColor: grey[100] }}
                    >
                        <Typography variant="h2">Topics</Typography>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                        >
                            <Typography
                                variant="h4"
                                color="primary"
                            >
                                Create New Topic
                                </Typography>
                            <IconButton className={classes.addButtonStyle}
                                onClick={this.handleDialogCreateTopic}>
                                <AddIcon style={{ fontSize: 30 }}
                                    color="primary" />
                            </IconButton>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            style={{ marginBottom: 10 }}
                        >
                            {
                                this.state.path.map((topic, index) => {
                                    if (index + 1 < this.state.path.length) {
                                        return <React.Fragment>
                                            <Button
                                                color="secondary"
                                                style={{ fontSize: 15 }}
                                                onClick={() => this.handlePathClicked(topic)}>
                                                {topic.name}
                                            </Button>
                                            <ArrowForwardIcon />
                                        </React.Fragment>
                                    }
                                    else {
                                        return <Button
                                            color="secondary"
                                            style={{ fontSize: 15 }}
                                            onClick={() => this.handlePathClicked(topic)}>
                                            {topic.name}
                                        </Button>
                                    }
                                })
                            }
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                            style={{ width: "100%", marginTop: 15 }}
                        >
                            {
                                this.state.isLoading ? <CircularProgress /> :

                                    <React.Fragment>{
                                        this.state.topics.map(topic =>
                                            <Topic topic={topic}
                                                onLoadSubtopics={this.handleLoadSubtopics}
                                                onEditTopic={this.handleDialogEditTopic} />
                                        )
                                    }
                                    </React.Fragment>

                            }
                        </Grid>
                    </Grid>
                    <EditTopic open={this.state.openEditTopic}
                        topicToChange={this.state.topicToChange}
                        onTopicChange={this.handleTopicChange}
                        onDialogChange={this.handleDialogEditTopic} />
                    <CreateTopicDialog
                        open={this.state.openCreateTopic}
                        onClose={this.handleDialogCreateTopic} />
                </div>
            </MuiThemeProvider>
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

Topics.propTypes = {
    fetchTopics: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    topics: state.topics.topics,
    token: state.login.token
})

const TopicsStyled = withStyles(styles)(Topics);

export default connect(mapStateToProps, { fetchTopics })(TopicsStyled);