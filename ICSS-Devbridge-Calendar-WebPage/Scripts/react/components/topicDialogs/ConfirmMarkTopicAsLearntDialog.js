import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';

import { connect } from 'react-redux';
import { addLearntTopic, deleteLearntTopic } from '../../redux/actions/learntTopicsActions';
import PropTypes from 'prop-types';


const styles = theme => ({

    dialogTitle: {
        fontSize: 20,
    },
    buttonWhiteColorText: {
        color: "white !important"
    },
    saveButton: {
        color: indigo[500]
    }
});

class ConfirmMarkTopicAsLearntDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    submit = async () => {
        if (this.props.dialogAction == "add") {
            await this.props.addLearntTopic(this.props.token.accessToken, this.props.topicId)
                .then(() => {
                    this.props.onClose()
                    this.props.markTopicAsLearnt()
                })
        }
        else {
            await this.props.deleteLearntTopic(this.props.token.accessToken, this.props.topicId)
                .then(() => {
                    this.props.onClose()
                    this.props.markTopicAsLearnt()
                })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog aria-labelledby="add-learning-day"
                onClose={this.props.onClose}
                open={this.props.open}
                fullWidth="true">

                <DialogTitle id="add-learning-day"
                    disableTypography="true"
                    classes={{ root: classes.dialogTitle }} >
                    Confirm
                </DialogTitle>

                <DialogContent>
                    <DialogContentText style={{ fontSize: 20 }}>
                        {this.props.dialogAction == "add" ?
                            "Topic will be marked as learnt" :
                            "Topic will be marked as not learnt"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start">
                        <Button
                            onClick={this.props.onClose}
                            variant="outlined"
                            size="medium">
                            Cancel
                        </Button>
                        <Button
                            onClick={this.submit}
                            color="primary"
                            variant="outlined"
                            size="medium">
                            Confirm
                        </Button>
                    </Grid>
                </DialogActions>

            </Dialog>
        );
    }
}

ConfirmMarkTopicAsLearntDialog.propTypes = {
    addLearntTopic: PropTypes.func.isRequired,
    deleteLearntTopic: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    token: state.login.token
})

export default connect(mapStateToProps, { addLearntTopic, deleteLearntTopic })(withStyles(styles)(ConfirmMarkTopicAsLearntDialog));