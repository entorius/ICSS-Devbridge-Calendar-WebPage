import React from "react";

import Grid from '@material-ui/core/Grid';

const topicNameStyle = {
    textSize: 20,
    display: "inline",
    color: "black",
    textAlign: "center",
    margin: 0
};
const GridItemStyle = {
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
            <Grid container item xs="3" direction="column" style={GridItemStyle}>
                <p style={topicNameStyle}>{this.props.name}</p>
                <ColoredLine color="white" />
                <p>Description: {this.props.name}</p>
                <ColoredLine color="white" />
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