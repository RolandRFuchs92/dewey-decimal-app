import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, TextField, Button, Tooltip, Typography, makeStyles } from '@material-ui/core';

import ErrorReport from './ErrorReport';

const useStyles = makeStyles(theme => {
    return {
        pullRight: {
            alignSelf: 'flex-end'
        }
    }
});

export default () => {
    return <Grid container lg={12}>
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

    return <Grid container lg={3}>
        <Typography variant="h5">App settings</Typography>
        <TooltipTextField title="The duration" label="Transition Duration" handleChange={handleChange}></TooltipTextField>
        <TooltipTextField title="" label="Database Location" handleChange={handleChange}></TooltipTextField>
        <Typography variant="h5">Library settings</Typography>
        <TooltipTextField title="" label="Fine rate" handleChange={handleChange}></TooltipTextField>
        <TooltipTextField title="" label="Days allowed out until fine" handleChange={handleChange}></TooltipTextField>
        <TooltipTextField title="The duration of the fade effect per page" label="Transition Duration" handleChange={handleChange}></TooltipTextField>
        <Grid item className={classes.pullRight}>
            <Button variant="contained" color="primary">Submit </Button>
        </Grid>
    </Grid>
}
