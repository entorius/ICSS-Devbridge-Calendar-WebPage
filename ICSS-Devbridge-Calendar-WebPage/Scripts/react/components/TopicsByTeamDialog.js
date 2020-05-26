import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { indigo, grey } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { fetchLearntTopicsByTeam, fetchPlannedTopicsByTeam } from '../redux/actions/learntTopicsActions';
import PropTypes from 'prop-types';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    closeIcon: {
        height: 40,
        width: 40
    },
    table: {
        margin: 10,
        width: '80%',
    },
    tableBody: {
        '& .MuiTableCell-root': {
            fontSize: 15
        },
    },
    tableHead: {
        '& .MuiTableCell-root': {
            color: 'white !important',
            fontSize: 15
        },
    }
});

class TeamsByTopicDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            isLoadingLearntTopics: false,
            isLoadingPlannedTopics: false
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ open: true, isLoadingLearntTopics: true, isLoadingPlannedTopics: true });
            await this.props.fetchLearntTopicsByTeam(this.props.token.accessToken, this.props.managerId)
                .then(() => {
                    console.log("learntTopicsByTeam: " + this.props.learntTopicsByTeam)
                    this.setState({ isLoadingLearntTopics: false });
                });

            await this.props.fetchPlannedTopicsByTeam(this.props.token.accessToken, this.props.managerId)
                .then(() => {
                    console.log("plannedTopicsByTeam: " + this.props.plannedTopicsByTeam)
                    this.setState({ isLoadingPlannedTopics: false });
                });
        }
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog fullScreen
                open={this.state.open}
                onClose={() => this.handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: grey[100]
                    },
                }}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => { this.handleClose() }}
                            aria-label="close"
                        >
                            <CloseIcon className={classes.closeIcon} />
                        </IconButton>
                        <Typography variant="h3" className={classes.title}>
                            Topics By Team
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Typography variant="h4" style={{ marginTop: 20, marginBottom: 15, }}>
                        {this.props.managerName}
                    </Typography>
                    <Typography variant="h5" style={{ marginTop: 10, marginBottom: 15, }}>
                        Topics
                    </Typography>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center">

                        {
                            this.state.isLoadingLearntTopics || this.state.isLoadingPlannedTopics
                                ? <CircularProgress /> : <TableContainer component={Paper} className={classes.table}>
                                    <Table >
                                        <TableHead style={{ backgroundColor: indigo[500] }} className={classes.tableHead}>
                                            <TableCell>First name</TableCell>
                                            <TableCell>Last name</TableCell>
                                            <TableCell>Role</TableCell>
                                            <TableCell style={{ width: "35%" }}>Learnt topics</TableCell>
                                            <TableCell style={{ width: "35%" }}>Planned topics</TableCell>
                                        </TableHead>
                                        <TableBody className={classes.tableBody}>
                                            {this.props.learntTopicsByTeam.map(learntTopic => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>{learntTopic.User.FirstName}</TableCell>
                                                        <TableCell>{learntTopic.User.LastName}</TableCell>
                                                        <TableCell>{learntTopic.User.Role}</TableCell>
                                                        <TableCell>
                                                            {

                                                                learntTopic.Topics.map(topic => {
                                                                    return (topic.Name)
                                                                }).join("; ")

                                                            }

                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                (() => {
                                                                    let t = this.props.plannedTopicsByTeam.find(plannedTopic =>
                                                                        plannedTopic.User.UserId === learntTopic.User.UserId)
                                                                    if (t != null) {
                                                                        return <React.Fragment>{t.Topics.map(topic => {
                                                                            let name = topic.Topic.Name
                                                                            return name
                                                                        }).join("; ")} </React.Fragment>
                                                                    }
                                                                })()
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        }
                    </Grid>
                </Grid>
            </Dialog>
        )
    }
}

TeamsByTopicDialog.propTypes = {
    fetchLearntTopicsByTeam: PropTypes.func.isRequired,
    fetchPlannedTopicsByTeam: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    learntTopicsByTeam: state.learntTopics.learntTopicsByTeam,
    plannedTopicsByTeam: state.learntTopics.plannedTopicsByTeam,
    token: state.login.token
})

const TeamsByTopicDialogStyled = withStyles(styles)(TeamsByTopicDialog);

export default connect(mapStateToProps, {
    fetchLearntTopicsByTeam,
    fetchPlannedTopicsByTeam
})(TeamsByTopicDialogStyled);