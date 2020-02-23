import React, { useEffect, useState, useReducer } from 'react';
import { Button, makeStyles, Grid } from '@material-ui/core';

import { Provider, reducer, constants} from './Context';
import { getScans } from 'pages/booksOut/booksout.repo';
import ScansToday from './ScansTemplate';
import BirthdaysToday from './BirthdaysToday';
import Icons from 'components/icons';
import Scan from './Scan';
import Overdue from './Overdue';
import { formatDateForDbInsert } from 'utils/businessRules'


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
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [scans, setScans] = useState({});

    useEffect(() => {
        (async () => {
            await resetScansToday();
        })()
    },[])

    const resetScansToday = async () => {
        const rawScans = await getScans();
        const checkins = rawScans.filter(({check_out_date}) => check_out_date === formatDateForDbInsert());
        const checkouts = rawScans.filter(({check_in_date}) => check_in_date === formatDateForDbInsert());   
        setScans({
            checkins,
            checkouts
        });
    }

    return <Provider value={resetScansToday}>
        <Grid container className={classes.container}>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)} startIcon={<div>{Icons.Barcode}</div>} fullWidth className={classes.barcodeButton}>Checkin / Checkout</Button>
            
            <Grid item className={classes.items}>
                <ScansToday scans={scans.checkins} title="Checkins Today"></ScansToday>
            </Grid>

            <Grid item className={classes.items}>
                <ScansToday scans={scans.checkouts} title="Checkouts Today"></ScansToday>
            </Grid>
            
            <Grid className={classes.items}>
                <Overdue></Overdue>
            </Grid>

            <Grid item className={classes.items}>
                <BirthdaysToday></BirthdaysToday>
            </Grid>
            <Scan open={open} handleClose={() => setOpen(false)}></Scan>
        </Grid>
    </Provider>
}
