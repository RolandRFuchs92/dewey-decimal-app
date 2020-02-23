import React, { useEffect, useState, useReducer } from 'react';
import { Button, makeStyles, Grid } from '@material-ui/core';

import { Provider, reducer, constants} from './Context';
import { getScans } from 'pages/booksOut/booksout.repo';
import ScansToday from './ScansTemplate';
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
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [state, setState] = useState([]);

    useEffect(() => {
        (async () => {
            setState(await getScans());
        })()
    },[])

    return <Provider value={[state, setState]}>
        <Grid container className={classes.container}>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)} startIcon={<div>{Icons.Barcode}</div>} fullWidth className={classes.barcodeButton}>Checkin / Checkout</Button>
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
        </Grid>
    </Provider>
}
