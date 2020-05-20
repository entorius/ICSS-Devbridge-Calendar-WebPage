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
    state = {
        regex: /((?:(?:http|ftp|https):\/\/)*(?:[\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:~+#-]*[\w@?^=%&~+#-])?)/g
    };

    renderText(text) {
        let parts = text.split(new RegExp(this.state.regex));
        for (let i = 1; i < parts.length; i += 3) {
            if (!(parts[i].includes("http://") || parts[i].includes("https://") || parts[i].includes("ftp://")))
                parts[i] = "http://" + parts[i];
            parts[i] = <a href={parts[i]}>{parts[i]}</a>
        }
        return parts
    }

    render() {
        return (
            <Grid container item
                xs="3"
                direction="column"
                style={gridItemStyle}>
                <p style={topicNameStyle}>{this.props.topic.name}</p>
                <ColoredLine color="white" />
                <p>{this.renderText(this.props.topic.description)}</p>
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