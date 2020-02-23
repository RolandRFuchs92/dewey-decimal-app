import React, { useEffect, useContext, useState } from 'react';
import { Typography, Paper, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        padding: 15,
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        background:'white',
        paddingBottom: 15
    },
    scanTileItem: {
        width: '50%'
    },
    scanTile: {
        textAlign: 'left',
        overflow: 'overlay',
    }
}));

export default ({scans,title}) => {
    const classes = useStyles();

    return (<Paper className={classes.container}>
        <Typography variant="h5" className={classes.title}>{title}</Typography>
        <div className={classes.scanTile}>
            {scans && scans.map(({author, book, student}) => {
                return <>
                    <Grid container >
                        <Grid item className={classes.scanTileItem}>{book}</Grid>
                        <Grid item className={classes.scanTileItem}>{author}</Grid>
                        <Grid item className={classes.scanTileItem}>{student}</Grid>
                        <Grid item className={classes.scanTileItem}>###TODO: TIME###</Grid>
                    </Grid>
                    <hr></hr>
                </>
            })
        }
        </div>
    </Paper>
    )
}