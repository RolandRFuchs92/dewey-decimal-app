import React from 'react';

import {Modal, Grid, Paper, Fade, makeStyles} from '@material-ui/core';
import appSettings from 'appSettings';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding:15
    },
    spacing: {
      
    }
}));

export default ({handleClose, open = false, ...rest}) => {
    const classes = useStyles();
    return <Modal open={open}  onBackdropClick={handleClose} closeAfterTransition>
        <Fade in={open} timeout={appSettings.fadeTransitionDuration}>
            <Grid container>
                <Paper className={classes.paper}>
                    {rest.children}
                </Paper>
            </Grid>
        </Fade>
    </Modal>
}