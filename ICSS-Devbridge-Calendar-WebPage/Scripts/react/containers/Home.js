import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import { withStyles } from '@material-ui/core/styles';
//Material UI components
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";

//Icons

import ForwardIcon from '@material-ui/icons/Forward';

const styles = theme => ({
    mainPage: {
        display: 'flex',
        height: '1100px'
    },
    homePageStyle: {
        width:'80%'
    },
    homeCalendarComponent: {
        width: '100%',
        height: '550px',
        backgroundColor: '#5A5A5A',
        display: 'flex'
    },
    homeLearningTreeComponent: {
        width: '100%',
        height: '550px',
        backgroundColor: '#5A5A5A',
        display: 'flex'
    },
    imageSideCalendar: {
        height: '100%',
        width: '60%',
        backgroundColor: '#B2EBF2',
        display: 'flex'
    },
    imageSideLearningTree: {
        height: '100%',
        width: '60%',
        backgroundColor: '#9BD5CC',
        display: 'flex'
    },
   
    triangleRight: {
        width: 0,
        height: 0,
        borderTop: '550px solid #5A5A5A',
        borderRight: '150px solid transparent',
        zIndex: '1'
    },
    triangleLeft: {
        width: '0',
        height: '0',
        marginLeft:'auto',
        borderBottom: '550px solid #5A5A5A',
        borderLeft: '150px solid transparent',
        zIndex: '1'
    },
    calendarImage: {
        backgroundImage: "url('../../../Assets/Calendar.jpg')",
        backgroundPosition: 'center',
        backgroundSize: '625px 400px',
        height: '400px',
        width: '625px',
        backgroundRepeat: 'no-repeat',
        marginTop: '70px',
        marginLeft: '-60px'
    },
    treeImage: {
        backgroundImage: "url('../../../Assets/tree.gif')",
        backgroundPosition: 'center',
        backgroundSize: '600px 450px',
        height: '450px',
        width: '600px',
        backgroundRepeat: 'no-repeat'
    },
    cover: {
        width: '40%',
        height: '100%',
        backgroundColor: '#5A5A5A',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    componentCalendarText: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#42A5F6',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%'

    },
    componentLearningTreeText: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#00A9A3',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%'

    },
    link: {
        display: 'flex',
        height: '80px',
    },
    linkCalendarButton: {
        border: 'solid #42A5F6',
        backgroundColor: '#B2EBF2',
        color: '#42A5F6',
        marginLeft: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        marginTop: '20px'

    },
    linkLearningTreeButton: {
        border: 'solid #00A9A3',
        backgroundColor: '#9BD5CC',
        color: '#00A9A3',
        marginLeft: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        marginTop: '20px'
    },
    linkButtonPicture: {
        marginRight: '10px'
    },
    linkButtonLabel: {
        fontSize: '14px'
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.mainPage} >
                <SideBar />
                <div className={classes.homePageStyle}>

                    <div className={classes.homeCalendarComponent}>

                        <div className={classes.cover} >
                            <div className={classes.componentCalendarText}>
                                Check and add 
                                your learning days
                                to calendar
                            </div>
                            <Link to="/Main/Calendar" className={classes.link}>
                                <Button className={classes.linkCalendarButton} classes={{ label: classes.linkButtonLabel }}>
                                GO TO CALENDAR
                                <ForwardIcon className={classes.linkButtonPicture} />
                                </Button>
                            </Link>
                        </div>
                        <div className={classes.imageSideCalendar}>

                            <div className={classes.triangleRight}/>
                            <div className={classes.calendarImage}/>
                            
                        </div>

                    </div>
                    <div className={classes.homeLearningTreeComponent} >

                        <div className={classes.imageSideLearningTree}>

                            <div className={classes.treeImage} />
                            <div className={classes.triangleLeft} />
                        </div>

                        <div className={classes.cover} >
                            <div className={classes.componentLearningTreeText}>
                                Grow your progress in learning tree
                            </div>
                            <Link to="/Main/LearningTree" className={classes.link}>
                                <Button className={classes.linkLearningTreeButton} classes={{ label: classes.linkButtonLabel }}>
                                GO TO LEARNING TREE
                                <ForwardIcon className={classes.linkButtonPicture} />
                                </Button>
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);