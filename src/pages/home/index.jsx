import React, { useEffect, useState, useContext } from 'react';
import { Button, makeStyles, Grid, Paper, Typography } from '@material-ui/core';

import { Provider, reducer, constants} from './Context';
import { getScans } from 'pages/booksOut/booksout.repo';
import ScansToday from './ScansTemplate';
import BirthdaysToday from './BirthdaysToday';
import Icons from 'components/icons';
import Scan from './Scan';
import Overdue from './Overdue';
import { formatDateForDbInsert } from 'utils/businessRules'
import rootContext from 'utils/context';

const useStyles = makeStyles(theme => ({
    container: {
        // display: 'flex',
    },
    homePageContainer: {
        padding: 15,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        background:'white',
        paddingBottom: 15
    },
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
    },
    content: {
        textAlign: 'left',
        overflow: 'overlay',
    }
}));

export default () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [scans, setScans] = useState({});
    const { toggleScan } = useContext(rootContext);

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
            <Button variant="contained" color="primary" onClick={() => toggleScan()} startIcon={<div>{Icons.Barcode}</div>} fullWidth className={classes.barcodeButton}>Checkin / Checkout</Button>
            
            <HomePageTile title="Checkins Today">
                <ScansToday scans={scans.checkins} ></ScansToday>
            </HomePageTile>

            <HomePageTile title="Checkouts Today">
                <ScansToday scans={scans.checkouts} ></ScansToday>
            </HomePageTile>
            
            <HomePageTile title="Books Overdue">
                <Overdue></Overdue>
            </HomePageTile>

            <HomePageTile titleComponent={<Typography variant="h5" className={classes.heading}>{Icons.Birthday} Birthdays Today {Icons.Birthday}</Typography>}>
                <BirthdaysToday></BirthdaysToday>
            </HomePageTile>

        </Grid>
    </Provider>
}

const HomePageTile = ({title, titleComponent, children}) => {
    const classes = useStyles();

    return <Grid item className={classes.items}>
        <Paper className={classes.homePageContainer}>
            {title 
                ? <Typography variant="h5" className={classes.title}>{title}</Typography>
                : titleComponent
            }
            <div className={classes.content}>
                {children}    
            </div>
        </Paper>
    </Grid>
}