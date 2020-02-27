import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, TextField, Button, Tooltip, Typography, makeStyles } from '@material-ui/core';

import ErrorReport from './ErrorReport';
import { TooltipTextField } from 'components/inputs/TextField';

const useStyles = makeStyles(theme => {
    return {
        pullRight: {
            alignSelf: 'flex-end'
        }
    }
});

export default () => {
    return <Grid container>
        <AppSettings/>
        <ErrorReport></ErrorReport>
    </ Grid>
}

function AppSettings  () {
    const [state, setState] = useState({});
    const classes = useStyles();
    const handleChange = name => ({target: value}) => {
        setState({...state, [name]: value})
    }

    return <Grid item container lg={3}>
        <Typography variant="h5">App settings</Typography>
        <TooltipTextField tooltip="The duration of the fade effects during page transition" label="Transition Duration" handleChange={handleChange}></TooltipTextField>
        <TooltipTextField tooltip="Where to store the database. Point this to a local 'onedrive','google drive' folder for cloud storage.(anything that can sync to a cloud)" label="Database Location" handleChange={handleChange}></TooltipTextField>
        <Typography variant="h5">Library settings</Typography>
        <TooltipTextField tooltip="The monitary value calculated per day a book is overdue" label="Fine rate" handleChange={handleChange}></TooltipTextField>
        <TooltipTextField tooltip="Number of days a student may have a book before a fine is due" label="Days allowed to keep a book" handleChange={handleChange}></TooltipTextField>
        <TooltipTextField tooltip="The duration of the fade effect per page." label="Transition Duration" handleChange={handleChange}></TooltipTextField>
        <Grid item className={classes.pullRight}>
            <Button variant="contained" color="primary">Submit </Button>
        </Grid>
    </Grid>
}
