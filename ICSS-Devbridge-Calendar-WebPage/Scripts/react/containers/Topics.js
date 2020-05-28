import React from 'react';
import SideBar from "../components/SideBar";
import Topic from "../components/Topic";
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CreateTopicDialog from '../components/topicDialogs/CreateTopicDialog';
import EditTopicDialog from '../components/topicDialogs/EditTopicDialog';
import { grey, indigo, green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import { checkIfRedirectToLoginPage } from '../functions/LocalStorageFunctions';
import { connect } from 'react-redux';
import { fetchTopics } from '../redux/actions/topicActions';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
            topicToUpdate: {},
            openEditTopic: false,
            openCreateTopic: false,
            path: [{ name: "Main topics", id: null }],
            showAlertSuccess: false,
            alertSuccesMessage: ""
        };
        this.handleLoadSubtopics = this.handleLoadSubtopics.bind(this);
        this.handleEditTopicDialogOpen = this.handleEditTopicDialogOpen.bind(this);
        this.handleEditTopicDialogClose = this.handleEditTopicDialogClose.bind(this);
        this.handleDialogCreateTopic = this.handleDialogCreateTopic.bind(this);
    };

    handleShowAlert = (message) => {
        this.setState(prevState => ({ showAlertSuccess: !prevState.showAlertSuccess }))
    }

    handleLoadSubtopics(topic) {
        let subtopics = this.props.topics.filter(t => t.ParentTopicId === topic.TopicId)
        let newPathTopic = { name: topic.Name, id: topic.TopicId }
        this.setState({ topics: subtopics, path: [...this.state.path, newPathTopic] });
    };

    handleEditTopicDialogOpen(topic) {
        this.setState({ topicToUpdate: topic, openEditTopic: true });
    }

    handleEditTopicDialogClose() {
        this.setState({ topicToUpdate: {}, openEditTopic: false });
    }

    handleDialogCreateTopic() {
        this.setState({ openCreateTopic: !this.state.openCreateTopic });
    };

    async getTopics() {
        checkIfRedirectToLoginPage(this.props);
        this.setState({ isLoading: true })
        await this.props.fetchTopics(this.props.token.accessToken)
            .then(() => {
                console.log("topics: " + this.props.topics)
                let mainTopics = this.props.topics.filter(t => t.ParentTopicId === null)
                this.setState({ topics: mainTopics, isLoading: false })
            });
    }

    componentDidMount() {
        this.getTopics();
    };

    handlePathClicked = (path) => {
        let subtopics = this.props.topics.filter(t => t.ParentTopicId === path.id)
        this.setState({ topics: subtopics });
        let pathIndex = this.state.path.findIndex(p => p.id === path.id);
        console.log("pathIndex" + path.name + " " + path.id + " " + pathIndex)
        let newPath = this.state.path.slice(0, pathIndex + 1)
        this.setState({ path: newPath });
    }

    createUpdateTopicSuccess = (message) => {
        let mainPath = [{ name: "Main topics", id: null }];
        this.setState({ path: mainPath })
        this.getTopics();
        this.setState({ alertSuccesMessage: message })
        this.handleShowAlert();
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
                                                onEditTopic={this.handleEditTopicDialogOpen} />
                                        )
                                    }
                                    </React.Fragment>

                            }
                        </Grid>
                    </Grid>
                    <EditTopicDialog open={this.state.openEditTopic}
                        topic={this.state.topicToUpdate}
                        onClose={this.handleEditTopicDialogClose}
                        updateTopicSuccess={() => this.createUpdateTopicSuccess("Successfully update")}
                    />
                    <CreateTopicDialog
                        open={this.state.openCreateTopic}
                        onClose={this.handleDialogCreateTopic}
                        createTopicSuccess={() => this.createUpdateTopicSuccess("Successfully created")} />
                    <Snackbar open={this.state.showAlertSuccess} autoHideDuration={3000} onClose={this.handleShowAlert}>
                        <MuiAlert
                            elevation={6}
                            variant="filled"
                            onClose={this.handleShowAlert}
                            severity="success"
                            className={classes.alert}>
                            {this.state.alertSuccesMessage}
                        </MuiAlert>
                    </Snackbar>
                </div>
            </MuiThemeProvider>
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