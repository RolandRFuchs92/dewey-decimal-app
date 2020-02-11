import React from 'react';

import { Grid } from '@material-ui/core'

import Summary1 from './summary1';
import Summary2 from './summary2';
import Summary3 from './summary3';


export default () => {

    return <Grid container>
        <h1> dewey System page</h1>
        <Summary1></Summary1>
        <Summary2></Summary2>
        <Summary3></Summary3>
    </Grid>
}