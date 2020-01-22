import React from 'react';
import {Grid, TextField} from '@material-ui/core';

export default () => {
    return (
    <Grid container item direction="column" xs>
        <TextField label="First name"></TextField>
        <TextField label="Last name"></TextField>
        <TextField label="Mobile"></TextField>
        <TextField label="Email"></TextField>
        <TextField label="Class"></TextField>
    </Grid>
    )
}