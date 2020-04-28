import React, { Component } from 'react';
//Styles providers
import { withStyles } from '@material-ui/core/styles';

//Material UI components
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";

//Icons

import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment'; //Topics
import EventIcon from '@material-ui/icons/Event';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({

    sideBarDiv: {
        width: '20%',
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#555555',
        flexDirection: 'column',
        minWidth: '250px'
    },
    logo: {
        backgroundImage: "url('../../../Assets/devbridgeLogo.png')",
        backgroundSize: '70px 70px',
        height: '70px',
        width: '70px',
        backgroundRepeat: 'no-repeat'
    },
    logoName: {
        paddingTop: '20px',
        paddingLeft: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#ffffff'
    },
    logoGroup: {
        display: 'flex'
    },
    circle: {
        width: '80px',
        height: '80px',
        background: '#D9001B',
        marginRight: 'auto',
        marginLeft: 'auto',
        fontWeight: 'bold',
        marginTop: '50px',
        fontSize: '25px'
    },
    links: {
    },
    link: {
        width: '100%',
        display: 'flex',
        marginTop: '30px',
        borderBottom: 'solid 2px #696969'
    },
    linkButton: {
        backgroundColor: '#555555',
        border: 0,
        color: '#ffffff',
        marginLeft: '20px'
    },
    linkButtonLabel: {
        fontSize: '14px'
    },
    linkButtonPicture: {
        marginRight: '10px'
    }

});
class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.sideBarDiv} >
                <div className={classes.logoGroup}>
                    <div className={classes.logo} />
                    <div className={classes.logoName}>DEVBRIDGE</div>
                </div>
                <Avatar className={classes.circle}>N</Avatar>
                <div className={classes.links}>
                    <Link to="/Main/Home" className={classes.link}>
                        <Button className={classes.linkButton} classes={{ label: classes.linkButtonLabel }}>
                            <HomeIcon className={classes.linkButtonPicture} />
                            HOME
                            </Button>
                    </Link>
                    {/*TODO: on click load this leader team memebers and their restrictions, global restrictions (if this is the admin),
                     * all teams restrictions (team, for which this member is leading and all lower level teams) and somehow represent in json
                     * the levels of teams and members (which member belongs to which team and which team is leading to lower teams)*/}
                    <Link to="/Main/Team" className={classes.link}>
                        <Button className={classes.linkButton} classes={{ label: classes.linkButtonLabel }}>
                            <GroupIcon className={classes.linkButtonPicture} />
                            TEAM
                            </Button>
                    </Link>
                    <Link to="/Main/Topics" className={classes.link}>
                        <Button className={classes.linkButton} classes={{ label: classes.linkButtonLabel }}>
                            <AssignmentIcon className={classes.linkButtonPicture} />
                            TOPICS
                            </Button>
                    </Link>
                    <Link to="/Main/Calendar" className={classes.link}>
                        <Button className={classes.linkButton} classes={{ label: classes.linkButtonLabel }}>
                            <EventIcon className={classes.linkButtonPicture} />
                            CALENDAR
                            </Button>
                    </Link>
                    <Link to="/Main/LearningTree" className={classes.link}>
                        <Button className={classes.linkButton} classes={{ label: classes.linkButtonLabel }}>
                            <AccountTreeIcon className={classes.linkButtonPicture} />
                            LEARNING TREE
                            </Button>
                    </Link>
                    <Link to="/Main/Settings" className={classes.link}>
                        <Button className={classes.linkButton} classes={{ label: classes.linkButtonLabel }}>
                            <SettingsIcon className={classes.linkButtonPicture} />
                            SETTINGS
                            </Button>
                    </Link>
                    <Link to="/" className={classes.link}>
                        <Button className={classes.linkButton} classes={{ label: classes.linkButtonLabel }}>
                            <ExitToAppIcon className={classes.linkButtonPicture} />
                            LOGOUT
                            </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SideBar);