import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import LoopIcon from '@material-ui/icons/Loop';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

//Colors
import { indigo, grey, green, orange, red } from '@material-ui/core/colors';

import { connect } from 'react-redux';
import { fetchEmployeesByTopic } from '../../redux/actions/learntTopicsActions';
import { fetchAssignments, fetchSubordinateAssignments } from '../../redux/actions/assignmentActions';
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
    noEmployeesFoundMessage: {
        fontWeight: "bold",
        color: grey[600]
    }
});

class CheckMyAssignments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ isLoading: true });
            await this.props.fetchAssignments(this.props.token.accessToken);
            this.setState({ isLoading: false });
        }
    }
    getTopic(topicId) {
        var selectedTopic = null;
        this.props.topics.map(topic => {
            topic.TopicId == topicId ? selectedTopic = topic : null;
        })
        if (selectedTopic == null) {
            return ""
        }
        else {
            return selectedTopic.Name;
        }
    }
    isNotOverdue(dateString) {
        var splitedDate = dateString.split("-");
        var year = splitedDate[0];
        var month = splitedDate[1];
        var day = splitedDate[2].split("T")[0];
        var d = new Date(parseInt(year), parseInt(month), parseInt(day));
        return d >= new Date();
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog fullScreen
                open={this.props.open}
                onClose={() => this.props.onClose("openEmployeesByTopicDialog")}
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
                            onClick={() => this.props.onClose("openEmployeesByTopicDialog")}
                            aria-label="close"
                        >
                            <CloseIcon className={classes.closeIcon} />
                        </IconButton>
                        <Typography variant="h3" className={classes.title}>
                            My Assignments
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
                        Assignments
                    </Typography>
                    {
                        this.state.isLoading ? <CircularProgress /> :
                            this.props.assignments.items.length == 0 ?
                                <Typography variant="h5" className={classes.noEmployeesFoundMessage}>
                                    No assignments found
                                </Typography> :
                                <TableContainer component={Paper} className={classes.table}>
                                    <Table >
                                        <TableHead style={{ backgroundColor: indigo[500] }} className={classes.tableHead}>
                                            <TableCell>Topic Name</TableCell>
                                            <TableCell>Due Date</TableCell>
                                            <TableCell>Comment</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableHead>
                                        <TableBody className={classes.tableBody}>
                                            {
                                                this.props.assignments.items.map(assign => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>{this.getTopic(assign.TopicId)}</TableCell>
                                                        <TableCell>{assign.Date}</TableCell>
                                                        <TableCell>{assign.Comments}</TableCell>
                                                        <TableCell>{assign.StateId == 1 && this.isNotOverdue(assign.Date) ?
                                                            <div>
                                                                <LoopIcon style={{ color: orange[500] }}/> <div>In progress</div>
                                                            </div> : assign.StateId == 0 ?
                                                            <div>
                                                                 <CheckCircleIcon style={{ color: green[500] }}/> <div>Completed</div>
                                                            </div> :
                                                            <div>
                                                                    <NotInterestedIcon style={{ color: red[500] }}/> <div> Overdue</div>
                                                            </div>}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                    }
                </Grid>
            </Dialog>
        )
    }
}
CheckMyAssignments.propTypes = {
    fetchEmployeesByTopic: PropTypes.func.isRequired,
    fetchAssignments: PropTypes.func.isRequired,
    fetchSubordinateAssignments: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    employeesByTopic: state.learntTopics.employeesByTopic,
    token: state.login.token,
    assignments: state.assignments
})

const CheckMyAssignmentsStyled = withStyles(styles)(CheckMyAssignments);

export default connect(mapStateToProps, { fetchEmployeesByTopic, fetchAssignments, fetchSubordinateAssignments })(CheckMyAssignmentsStyled);