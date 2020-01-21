import React from 'react';
import {Grid} from '@material-ui/core';

import {StandardTextFiled} from 'components/inputs'

export default () => {
    return (
        <Grid container>
            <StandardTextFiled label="Class Name"></StandardTextFiled>
            <StandardTextFiled label="Grade"></StandardTextFiled>
        </Grid>
    )
}