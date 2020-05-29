import React from "react";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EmployeesByTopicDialog from './EmployeesByTopicDialog';
import TeamsByTopicDialog from './TeamsByTopicDialog';
import { indigo, green, grey, blue } from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    cardRoot: {
        width: "80%",
        marginBottom: 15
    },
    openDialogbuttons: {
        color: indigo[900],
        fontSize: '12px'
    },
    divider: {
        marginTop: 5,
        marginBottom: 5
    }
});

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: {
            main: green[700]
        },
        textSecondary: {
            main: grey[700]
        }
    }
});

class Topic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openEmployeesByTopicDialog: false,
            openTeamsByTopicDialog: false,
            urlRegex: /((?:(?:http|ftp|https):\/\/)*(?:[\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:~+#-]*[\w@?^=%&~+#-])?)/g
        }
    }

    convertLinksInText(text) {
        let parts = text.split(new RegExp(this.state.urlRegex));
        for (let i = 1; i < parts.length; i += 3) {
            if (!(parts[i].includes("http://") || parts[i].includes("https://") || parts[i].includes("ftp://")))
                parts[i] = "http://" + parts[i];
            parts[i] = <a href={parts[i]}>{parts[i]}</a>
        }
        return parts
    }

    handleOpenDialog = (e) => {
        var name = e.currentTarget.name;
        this.setState(prevState => ({ [name]: !prevState[name] }));
    }

    handleCloseDialog = (name) => {
        this.setState({ [name]: false })
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme}>
                    <Card className={classes.cardRoot}>
                        <CardContent style={{ marginBottom: 0, paddingBottom: 0 }}>
                            <Typography variant="h4" color="primary" align="center">
                                {this.props.topic.Name}
                            </Typography>
                            <Divider className={classes.divider} />
                            <Typography variant="h6" color="textSecondary">
                                {
                                    this.props.topic.Description.trim() == "" ? "No description" :
                                        this.convertLinksInText(this.props.topic.Description)
                                }

                            </Typography>
                            <Divider className={classes.divider} />
                        </CardContent>
                        <CardActions style={{ width: "100%", marginTop: 0 }}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Button onClick={this.handleOpenDialog} className={classes.openDialogbuttons} name="openEmployeesByTopicDialog">
                                        Employees
                                    </Button>
                                    <Button onClick={this.handleOpenDialog} className={classes.openDialogbuttons} name="openTeamsByTopicDialog">
                                        Teams
                                </Button>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Button color="secondary" onClick={() => this.props.onLoadSubtopics(this.props.topic)} style={{ fontSize: 12 }}>
                                        Open subtopics
                                    </Button>
                                    <Button color="secondary" onClick={() => this.props.onEditTopic(this.props.topic)} style={{ fontSize: 12 }}>
                                        Edit  topic
                                </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </MuiThemeProvider>
                <EmployeesByTopicDialog
                    open={this.state.openEmployeesByTopicDialog}
                    onClose={() => this.handleCloseDialog("openEmployeesByTopicDialog")}
                    topic={this.props.topic.Name}
                    topicId={this.props.topic.TopicId} />
                <TeamsByTopicDialog
                    open={this.state.openTeamsByTopicDialog}
                    onClose={() => this.handleCloseDialog("openTeamsByTopicDialog")}
                    topic={this.props.topic.Name}
                    topicId={this.props.topic.TopicId} />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Topic);