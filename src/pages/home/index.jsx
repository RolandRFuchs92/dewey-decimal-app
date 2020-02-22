import React, { useState } from 'react';
import { Button, makeStyles, Grid } from '@material-ui/core';

import ScansToday from './ScansToday';
import BirthdaysToday from './BirthdaysToday';
import Icons from 'components/icons';
import Scan from './Scan';
import Overdue from './Overdue';

const useStyles = makeStyles(theme => ({
    items: {
        width:500,
        height: 350,
        margin: '0px 15px 15px 0px'
    },
    barcodeButton: {
        marginBottom: 15,
        fontSize:30,
        '& svg': {
            fontSize: 47
        }
    }
}));

export default () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    return <Grid container className={classes.container}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)} startIcon={<div>{Icons.Barcode}</div>} fullWidth className={classes.barcodeButton}>Check-in/out</Button>
        <Grid item className={classes.items}>
            <BirthdaysToday></BirthdaysToday>
        </Grid>

        <Grid item className={classes.items}>
            <ScansToday ></ScansToday>
        </Grid>

        <Grid className={classes.items}>
            <Overdue></Overdue>
        </Grid>
        <Scan open={open} handleClose={() => setOpen(false)}></Scan>
    </Grid>;
}
