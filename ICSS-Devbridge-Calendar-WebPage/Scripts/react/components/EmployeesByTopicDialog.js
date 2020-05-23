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

import { connect } from 'react-redux';
import { fetchEmployeesByTopic } from '../redux/actions/learntTopicsActions';
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
    }
});

class EmployeesByTopicDialog extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            await this.props.fetchEmployeesByTopic(this.props.token.accessToken, this.props.topicId)
                .then(() => {
                    console.log("employeesByTopic: " + this.props.employeesByTopic)
                });
        }
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
                            Employees By Topic
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
                        Employees
                    </Typography>
                    <TableContainer component={Paper} className={classes.table}>
                        <Table >
                            <TableHead style={{ backgroundColor: indigo[500] }} className={classes.tableHead}>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>Role</TableCell>
                            </TableHead>
                            <TableBody className={classes.tableBody}>
                                {this.props.employeesByTopic.map(employee => {
                                    return (
                                        <TableRow>
                                            <TableCell>{employee.FirstName}</TableCell>
                                            <TableCell>{employee.LastName}</TableCell>
                                            <TableCell>{employee.Role}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Dialog>
        )
    }
}

EmployeesByTopicDialog.propTypes = {
    fetchEmployeesByTopic: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    employeesByTopic: state.learntTopics.employeesByTopic,
    token: state.login.token
})

const EmployeesByTopicDialogStyled = withStyles(styles)(EmployeesByTopicDialog);

export default connect(mapStateToProps, { fetchEmployeesByTopic })(EmployeesByTopicDialogStyled);