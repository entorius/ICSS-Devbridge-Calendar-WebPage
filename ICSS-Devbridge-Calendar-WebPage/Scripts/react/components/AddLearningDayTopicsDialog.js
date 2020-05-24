import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import BookIcon from '@material-ui/icons/Book';
import Grid from '@material-ui/core/Grid';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { indigo, blue } from '@material-ui/core/colors';
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const styles = theme => ({
    root: {
        padding: "10px",
        width: "370px"
    },
    dialogTitle: {
        fontSize: 25,
    },
    bookIcon: {
        width: '30px',
        height: '30px'
    },
    button: {
        width: "25%",
    },
    buttonWhiteColorText: {
        color: "white !important"
    },
    tree: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },

});

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: blue
    }
});

class AddLearningDayTopicsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTopic: this.props.selectedTopic,
            topics: {}
        }
    }

    async componentDidMount() {
        this.createTopicTree(this.props.topics);
    }

    createTopicTree(topics){
        let topicTree = {
            id: 'root',
            name: 'Topics',
            children: undefined
        }
        const rootTopics = topics.filter(topic => topic.ParentTopicId == null);
        
        const rootTopicArray = [];
        
        rootTopics.forEach(topic => {
            const formattedTopic = { id: topic.TopicId, name: topic.Name, children: this.findChildrenForTopic(topics, topic.TopicId) };
            rootTopicArray.push(formattedTopic);
        });

        topicTree.children = rootTopicArray;

        this.setState({topics: topicTree})
    }

    findChildrenForTopic(topics, topicId){
        const children = topics.filter(topic => topic.ParentTopicId == topicId);

        const topicChildren = [];

        children.forEach(childTopic => {
            const topic = { id: childTopic.TopicId, name: childTopic.Name, children: this.findChildrenForTopic(topics, childTopic.TopicId) };
            topicChildren.push(topic);
        });
        
        return topicChildren;
    }

    checkBoxClicked = (event, checked, topic) => {
        if (checked) {
            this.setState({
                selectedTopic: topic
            });
        }
        else {
            this.setState({ selectedTopic: null })
        };
    };


    handleClose = () => {
        this.props.onClose();
    };

    handleFormChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        let label = <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
                id="test"
                color="primary"
            />
            <Typography variant="caption">testas</Typography>
        </div>
        const renderTree = (nodes) => (
            <TreeItem key={nodes.id} nodeId={nodes.id}
                label={nodes.id != 'root' ? <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        id={`checkbox-${nodes.id}`}
                        color="primary"
                        checked={this.state.selectedTopic != null && this.state.selectedTopic.id == nodes.id && this.state.selectedTopic.name == nodes.name}
                        onChange={(event, checked) => this.checkBoxClicked(event, checked, {id: nodes.id, name: nodes.name})}
                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 25 }} />}
                        checkedIcon={<CheckBoxIcon style={{ fontSize: 25 }} />}
                        onClick={e => (e.stopPropagation())}
                    />
                    <Typography variant="caption" style={{ fontSize: '15px' }}>{nodes.name}</Typography>
                </div> : <Typography variant="caption" style={{ fontSize: '15px' }}>{nodes.name}</Typography>}>
                {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
            </TreeItem>
        );
        return (
            <MuiThemeProvider theme={theme}>
                <Dialog aria-labelledby="add-learning-day"
                    onClose={this.props.onClose}
                    open={this.props.open}
                    fullWidth="true"
                    PaperProps={{
                        classes: {
                            root: classes.root
                        }
                    }}>

                    <DialogTitle id="add-learning-day"
                        disableTypography="true"
                        classes={{ root: classes.dialogTitle }} >
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <BookIcon className={classes.bookIcon} />
                            Edit topics
                        </Grid>
                    </DialogTitle>

                    <DialogContent>
                    <TreeView
                        className={classes.tree}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        defaultExpanded={['root']}
                    >
                        {renderTree(this.state.topics)}
                    </TreeView>
                    </DialogContent>
                    <DialogActions>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start">
                            <Button
                                onClick={() => { this.props.updateTopics(this.state.selectedTopic); this.props.onClose(); }}
                                variant="contained"
                                className={[classes.button, classes.buttonWhiteColorText].join(' ')}
                                color="secondary">
                                Save
                               </Button>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>
        )
    }

}

export default withStyles(styles)(AddLearningDayTopicsDialog);