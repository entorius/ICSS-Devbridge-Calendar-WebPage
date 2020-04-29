import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import Popover from '@material-ui/core/Popover';
import { Card, CardActionArea, Grid } from '@material-ui/core';
import EditLearningDayDialog from "./EditLearningDayDialog";

const styles = theme => ({
    card: {
        height: "30px",
        width: "120px",
        margin: "0px",
        textAlign: 'left',
        justifyContent: "center",
        display: "flex"
    },
})

class LearningDayInfoPopover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: this.props.topic,
            date: this.props.date,
            openEditLearningDayDialog: false
        };
    }

    handleOpenDialog = () => {
        this.setState({ openEditLearningDayDialog: true })
    };

    handleCloseDialog = () => {
        this.setState({ openEditLearningDayDialog: false })
    };

    render() {
        const { classes } = this.props;

        return <PopupState variant="popover">
            {(popupState) => (
                <React.Fragment>
                    <Card className={classes.card}
                        style={{ backgroundColor: this.props.color }}>
                        <CardActionArea className={classes.action}  {...bindTrigger(popupState)}>
                            <Typography component="h5" variant="h5">
                                {this.state.topic}
                            </Typography>
                        </CardActionArea>
                    </Card>
                    <Popover
                        {...bindMenu(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        getContentAnchorEl={null}
                        disableAutoFocusItem
                        PaperProps={{ style: { width: "120px" } }}>
                        <Grid
                            container
                            direction="column"
                            alignItems="flex-start"
                            style={{ margin: "5px" }}>
                            <StopRoundedIcon style={{ color: this.props.color }} />
                            <Grid
                                container
                                direction="column"
                                alignItems="flex-start"
                                style={{ margin: "5px" }}>
                                <Typography component="h5" variant="h5">
                                    {this.state.topic}
                                </Typography>
                                <Typography component="h5" variant="h5">
                                    {this.state.date}
                                </Typography>
                                <Button
                                    onClick={this.handleOpenDialog}
                                    variant="contained"
                                    color="secondary">
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>
                    </Popover>
                    <EditLearningDayDialog
                        open={this.state.openEditLearningDayDialog}
                        onClose={this.handleCloseDialog} />
                </React.Fragment>
            )}
        </PopupState>
    }
}

export default withStyles(styles)(LearningDayInfoPopover)
