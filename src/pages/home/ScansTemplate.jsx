import React, { useEffect, useContext, useState } from 'react';
import { Typography, Paper, makeStyles, Grid } from '@material-ui/core';
import { chain } from 'lodash';

import context from './Context';
import { formatDateForDbInsert } from 'utils/businessRules'

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        padding: 15,
    },
    scanTileItem: {
        width: '50%'
    },
    scanTile: {
        textAlign: 'left'
    }
}));

export default () => {
    const classes = useStyles();
    const [scans, setScans] = useState({});
    const [state] = useContext(context);

    useEffect(() => {
        const checkins = state.filter(({check_out_date}) => check_out_date === formatDateForDbInsert());
        const checkouts = state.filter(({check_in_date}) => check_in_date === formatDateForDbInsert());   
        setScans({
            checkins,
            checkouts
        });
    }, [state])

    return <Paper className={classes.container}>
        <Typography variant="h5">Checkins Today</Typography>
        {scans.checkins && scans.checkins.map(({author, book, student}) => {
            return <>
               <Grid container className={classes.scanTile}>
                    <Grid item className={classes.scanTileItem}>{book}</Grid>
                    <Grid item className={classes.scanTileItem}>{author}</Grid>
                    <Grid item className={classes.scanTileItem}>{student}</Grid>
                    <Grid item className={classes.scanTileItem}>{student}</Grid>
                </Grid>
                <hr></hr>
            </>
        })}
        <Typography variant="h5">Checkouts Today</Typography>
        {
            scans.checkouts && scans.checkouts.map(({author, book, student}) => {
                return <>
                <Grid container className={classes.scanTile}>
                    <Grid item className={classes.scanTileItem}>{book}</Grid>
                    <Grid item className={classes.scanTileItem}>{author}</Grid>
                    <Grid item className={classes.scanTileItem}>{student}</Grid>
                    <Grid item className={classes.scanTileItem}>{student}</Grid>
                </Grid>
                <hr></hr>
            </>
            })
        }
    </Paper>
}