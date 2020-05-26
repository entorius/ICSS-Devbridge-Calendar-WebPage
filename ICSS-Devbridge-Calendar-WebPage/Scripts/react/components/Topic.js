import React from "react";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EmployeesByTopicDialog from './EmployeesByTopicDialog';
import TeamsByTopicDialog from './TeamsByTopicDialog';
import { indigo } from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';

const topicNameStyle = {
    fontSize: 20,
    display: "inline",
    color: "black",
    textAlign: "center",
    margin: 0
};
const gridItemStyle = {
    backgroundColor: "cyan",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
};

const buttons = {
    color: indigo[900],
    fontSize: '12px',
}

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
        console.log(name)
        this.setState(prevState => ({ [name]: !prevState[name] }));
    }

    handleCloseDialog = (name) => {
        this.setState({ [name]: false })
    };

    render() {
        return (
            <Grid container item
                xs="3"
                direction="column"
                style={gridItemStyle}>
                <p style={topicNameStyle}>{this.props.topic.name}</p>
                <ColoredLine color="white" />
                <p>{this.convertLinksInText(this.props.topic.description)}</p>
                <ColoredLine color="white" />
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Typography variant="h5">
                        Learnt by
                        </Typography>
                    <Grid
                        container
                        direction="row"
                        style={{ width: 40 }}
                    >
                    </Grid>
                    <Button onClick={this.handleOpenDialog} style={buttons} name="openEmployeesByTopicDialog">
                        Employees
                        </Button>
                    <Button onClick={this.handleOpenDialog} style={buttons} name="openTeamsByTopicDialog">
                        Teams
                    </Button>
                </Grid>
                <EmployeesByTopicDialog
                    open={this.state.openEmployeesByTopicDialog}
                    onClose={() => this.handleCloseDialog("openEmployeesByTopicDialog")}
                    topic="Topic title"
                    topicId={6} />
                <TeamsByTopicDialog
                    open={this.state.openTeamsByTopicDialog}
                    onClose={() => this.handleCloseDialog("openTeamsByTopicDialog")}
                    topic="Topic title"
                    topicId={6} />
                <Button onClick={() => this.props.onLoadSubtopics(this.props.topic.id)}>
                    Open subtopics
                </Button>
                <Button onClick={() => this.props.onEditTopic(this.props.topic)}>
                    Edit {this.props.topic.name} topic
                </Button>
            </Grid >
        );
    }
}

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            margin: 0
        }}
    />
);

export default Topic;