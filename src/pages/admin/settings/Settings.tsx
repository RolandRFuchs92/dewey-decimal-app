import React, { useState } from 'react';
import { Grid, Button, Typography, makeStyles } from '@material-ui/core';

import { TooltipTextField } from 'components/inputs/TextField';
import appSettings from 'appSettings.json';

const useStyles = makeStyles(theme => {
  return {
    pullRight: {
      alignSelf: 'flex-end'
    }
  };
});

export default function AppSettings() {
  const [state, setState] = useState({});
  const classes = useStyles();
  const handleChange = (name: string) => ({
    target: value
  }: {
    target: { value: string };
  }) => {
    setState({ ...state, [name]: value });
  };

  const {
    fines,
    checkout,
    fadeTransitionDuration,
    databaseLocation
  } = appSettings;

  return (
    <Grid item container lg={3}>
      <Typography variant="h5">{state.name || 'App settings'}</Typography>
      <TooltipTextField
        data-testid="fadeDuration"
        value={`${fadeTransitionDuration}`}
        tooltip="The duration of the fade effects during page transition"
        label="Transition Duration"
        handleChange={handleChange('fadeDuration')}
      ></TooltipTextField>
      <TooltipTextField
        data-testid="databaseLocation"
        value={`${databaseLocation}`}
        tooltip="Where to store the database. Point this to a local 'onedrive','google drive' folder for cloud storage.(anything that can sync to a cloud)"
        label="Database Location"
        handleChange={handleChange('databaseLocation')}
      ></TooltipTextField>
      <Typography variant="h5">Library settings</Typography>
      <TooltipTextField
        data-testid="fineRate"
        value={`${fines.rate}`}
        tooltip="The monitary value calculated per day a book is overdue"
        label="Fine rate"
        handleChange={handleChange()}
      ></TooltipTextField>
      <TooltipTextField
        data-testid="daysAllowedOut"
        value={`${checkout.daysAllowedOut}`}
        tooltip="Number of days a student may have a book before a fine is due"
        label="Days allowed to keep a book"
        handleChange={handleChange()}
      ></TooltipTextField>
      <Grid item className={classes.pullRight}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
