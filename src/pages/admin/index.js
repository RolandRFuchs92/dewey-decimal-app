import React from 'react';
import { connect } from 'react-redux';
import { Grid, InputField, Button } from '@material-ui/core';

export default () => {
    return <Grid container>
        <InputField label="hello World"></InputField>
        <Button variant="contained" color="primary">Worlds </Button>
    </ Grid>
}