import React, { useEffect, useContext } from 'react';
import { Typography, Paper, makeStyles } from '@material-ui/core';

import context from './Context';

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        padding: 15,
    }
}));

export default () => {
    const classes = useStyles();
    const [state] = useContext(context);

    return <Paper className={classes.container}>
        <Typography variant="h5">Scans Today</Typography>
        {state.map((i) => {
            return <div>
                {JSON.stringify(i)}
                <hr></hr>
            </div>
        })}
    </Paper>
}