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
import CssBaseline from '@material-ui/core/CssBaseline';

import { connect } from 'react-redux';
import { fetchTeamsByTopic } from '../redux/actions/learntTopicsActions';
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
        width: '60%',
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
    },
    noTeamsFoundMessage: {
        fontWeight: "bold",
        color: grey[600]
    }
});

class TeamsByTopicDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ isLoading: true })
            await this.props.fetchTeamsByTopic(this.props.token.accessToken, this.props.topicId)
                .then(() => {
                    console.log("teamsTopic: " + this.props.teamsByTopic)
                    this.setState({ isLoading: false })
                });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <Dialog fullScreen
                    open={this.props.open}
                    onClose={this.props.onClose}
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
                                onClick={this.props.onClose}
                                aria-label="close"
                            >
                                <CloseIcon className={classes.closeIcon} />
                            </IconButton>
                            <Typography variant="h3" className={classes.title}>
                                Teams By Topic
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
                            {this.props.topic}
                        </Typography>
                        <Typography variant="h5" style={{ marginTop: 10, marginBottom: 15, }}>
                            Teams
                        </Typography>
                        {
                            this.state.isLoading ? <CircularProgress /> :
                                this.props.teamsByTopic.length == 0 ?
                                    <Typography variant="h5" className={classes.noTeamsFoundMessage}>
                                        No teams found
                                </Typography> :
                                    <TableContainer component={Paper} className={classes.table}>
                                        <Table >
                                            <TableHead style={{ backgroundColor: indigo[500] }} className={classes.tableHead}>
                                                <TableCell>Manager's first name </TableCell>
                                                <TableCell>Manager's last name </TableCell>
                                                <TableCell>Manager's role </TableCell>
                                                <TableCell style={{ width: "20%" }}>Number of employees that learnt this topic</TableCell>
                                            </TableHead>
                                            <TableBody className={classes.tableBody}>
                                                {this.props.teamsByTopic.map(team => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell>{team.TeamManager.FirstName}</TableCell>
                                                            <TableCell>{team.TeamManager.LastName}</TableCell>
                                                            <TableCell>{team.TeamManager.Role}</TableCell>
                                                            <TableCell>{team.MemberCount}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                        }
                    </Grid>
                </Dialog>
            </React.Fragment>
        )
    }
}

TeamsByTopicDialog.propTypes = {
    fetchTeamsByTopic: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    teamsByTopic: state.learntTopics.teamsByTopic,
    token: state.login.token
})

const TeamsByTopicDialogStyled = withStyles(styles)(TeamsByTopicDialog);

export default connect(mapStateToProps, { fetchTeamsByTopic })(TeamsByTopicDialogStyled);