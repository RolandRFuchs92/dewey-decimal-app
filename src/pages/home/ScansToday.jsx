import React, { useState, useEffect } from 'react';
import { Typography, Paper, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        padding:15,
    }
}));

export default () => {
    const classes = useStyles();
    const [scanns, setScanns] = 

    useEffect(() => {


    },[]);

    return <Paper className={classes.container}>
            <Typography variant="h5">Scans Today</Typography>
    </Paper>
}