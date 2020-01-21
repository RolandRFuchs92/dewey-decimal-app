import React from 'react';

import {Button, Grid} from '@material-ui/core';
import {SubmitButton, ResetButton} from './StandardButtons';

export default (onReset, onSubmit) => <Grid item>
        <Grid container direction="row" alignItems="flex-end" justify="flex-end">
            <Grid item>
                <ResetButton onReset={onReset}></ResetButton>
                <SubmitButton onSubmit={onSubmit}></SubmitButton>
            </Grid>
        </Grid>
    </ Grid>