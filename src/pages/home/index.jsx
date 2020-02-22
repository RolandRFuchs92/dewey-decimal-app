import React from 'react';
import { Button, makeStyles, Grid } from '@material-ui/core';

import ScansToday from './ScansToday';
import BirthdaysToday from './BirthdaysToday';
import Icons from 'components/icons';

const useStyles = makeStyles(theme => ({
    items: {
        height: 350,
        margin: '0px 15px 15px 0px'
    },
    barcodeButton: {
        marginBottom: 15
    }
}));

export default () => {
    const classes = useStyles();

    return <Grid container className={classes.container}>
        <Button variant="contained" color="primary" startIcon={Icons.Barcode} fullWidth className={classes.barcodeButton}>Check-in/out</Button>
        <Grid item className={classes.items}>
            <ScansToday ></ScansToday>
        </Grid>
        <Grid item className={classes.items}>
            <BirthdaysToday></BirthdaysToday>
        </Grid>
    </Grid>;
}
