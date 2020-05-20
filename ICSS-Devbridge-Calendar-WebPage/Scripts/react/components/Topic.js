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
            openTeamsByTopicDialog: false
        }
    }

    handleOpenEmployeesDialog = () => {
        this.setState({ openEmployeesByTopicDialog: true })
    };

    handleCloseEmployeesDialog = () => {
        this.setState({ openEmployeesByTopicDialog: false })
    };

    handleOpenTeamsDialog = () => {
        this.setState({ openTeamsByTopicDialog: true })
    };

    handleCloseTeamsDialog = () => {
        this.setState({ openTeamsByTopicDialog: false })
    };


    render() {
        return (
            <Grid container item
                xs="3"
                direction="column"
                style={gridItemStyle}>
                <p style={topicNameStyle}>{this.props.topic.name}</p>
                <ColoredLine color="white" />
                <p>
                    Description: Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </p>
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
                    <Button onClick={this.handleOpenEmployeesDialog} style={buttons}>
                        Employees
                        </Button>
                    <Button onClick={this.handleOpenTeamsDialog} style={buttons}>
                        Teams
                        </Button>
                </Grid>
                <EmployeesByTopicDialog
                    open={this.state.openEmployeesByTopicDialog}
                    onClose={this.handleCloseEmployeesDialog}
                    topic="Topic title" />
                <TeamsByTopicDialog
                    open={this.state.openTeamsByTopicDialog}
                    onClose={this.handleCloseTeamsDialog}
                    topic="Topic title" />
                <Button onClick={() => this.props.onLoadSubtopics(this.props.topic.id)}>
                    Open subtopics
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