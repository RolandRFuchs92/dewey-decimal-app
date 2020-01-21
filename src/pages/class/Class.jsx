import React from 'react';
import {Grid, Typography} from '@material-ui/core';

import {StandardTextFiled} from 'components/inputs/index';
import FormButtons from 'components/buttons/FormButtons';

export default () => {
    return (
        <Grid container direction="column" spacing={2}>
            <Grid item ><Typography >Class</Typography></Grid>
            <StandardTextFiled label="Class Name"></StandardTextFiled>
            <StandardTextFiled label="Grade"></StandardTextFiled>
            <FormButtons></FormButtons>
        </Grid>
    )
}