import React, { useState } from 'react';
import { Grid, Button, Typography, makeStyles } from '@material-ui/core';

import { TooltipTextField } from 'components/inputs/TextField';

const useStyles = makeStyles(theme => {
    return {
        pullRight: {
            alignSelf: 'flex-end'
        }
    }
});


export default function AppSettings  () {
    const [state, setState] = useState({});
    const classes = useStyles();
    const handleChange = name => ({target: value}) => {
        setState({...state, [name]: value})
    }

    return <Grid item container lg={3}>
        <Typography variant="h5">{state.name || 'App settings'}</Typography>
        <TooltipTextField tooltip="The duration of the fade effects during page transition" label="Transition Duration" handleChange={handleChange}></TooltipTextField>
        <TooltipTextField tooltip="Where to store the database. Point this to a local 'onedrive','google drive' folder for cloud storage.(anything that can sync to a cloud)" label="Database Location" handleChange={handleChange}></TooltipTextField>
        <Typography variant="h5">Library settings</Typography>
        <TooltipTextField tooltip="The monitary value calculated per day a book is overdue" label="Fine rate" handleChange={handleChange}></TooltipTextField>
        <TooltipTextField tooltip="Number of days a student may have a book before a fine is due" label="Days allowed to keep a book" handleChange={handleChange}></TooltipTextField>
        <Grid item className={classes.pullRight}>
            <Button variant="contained" color="primary" onClick={() => setState({name: 'Willy'})}>Submit</Button>
        </Grid>
    </Grid>
}
