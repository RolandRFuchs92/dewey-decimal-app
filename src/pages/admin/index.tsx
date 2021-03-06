import React from 'react';
import { Grid } from '@material-ui/core';

import ErrorReport from './errors/ErrorReport';
import Settings from './settings/Settings';

export default () => {
  return (
    <Grid container>
      <Settings />
      <ErrorReport />
    </Grid>
  );
};
