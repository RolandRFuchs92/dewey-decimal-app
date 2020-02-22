import React from 'react';

import {makeStyles, Typography, Paper} from '@material-ui/core';
import Icons from 'components/icons';

const useStyles = makeStyles(theme => ({
    container: {
        minWidth: 300,
        padding: 15,
        height: '100%'
    }
}));

export default () => {
    const classes = useStyles();

    return <Paper className={classes.container}>
        <Typography variant="h6">{Icons.Birthday} Birthdays Today {Icons.Birthday}</Typography>
    </Paper>
}