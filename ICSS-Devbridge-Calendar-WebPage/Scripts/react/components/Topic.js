import React from "react";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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

class Topic extends React.Component {
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
                <Button onClick={() => this.props.onLoadSubtopics(this.props.topic.id)}>
                    Open subtopics
                </Button>
            </Grid>
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