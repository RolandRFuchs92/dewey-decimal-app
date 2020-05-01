import React, { useState, useEffect } from 'react';
import { Button, makeStyles, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { formatDate } from 'appSettings.json';
import {
  CheckinIndicator,
  CheckoutIndicator,
  OverdueIndicator,
  BirthdayIndicator
} from 'components/icons/Indicator';
import { getScans } from 'pages/booksOut/Booksout.service';
import { ScansModel } from 'pages/booksOut/Booksout.type';
import Icons from 'components/icons';
import { ScannerToggleAction } from 'pages/scan/Scanner.action';

import { HomePageTileProps, HomeProps } from './Home.type';
import CheckInOut from './CheckInOut';
import Overdue from './Overdue';
import BirthdaysToday from './BirthdaysToday';
import { format } from 'date-fns';

const useStyles = makeStyles(theme => {
  return {
    homePageContainer: {
      padding: 15,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      paddingBottom: 15
    },
    items: {
      width: 500,
      height: 350,
      [theme.breakpoints.down('sm')]: {
        margin: 0
      }
    },
    barcodeButton: {
      fontSize: '1rem',
      '& svg': {
        fontSize: 47
      }
    },
    content: {
      textAlign: 'left',
      overflow: 'overlay'
    },
    titleContainer: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center'
    },
    indicator: {
      position: 'absolute',
      left: 0,
      fontSize: 23
    }
  };
});

export const Home = () => {
  const [checkouts, setCheckouts] = useState<ScansModel[]>([]);
  const [checkins, setCheckins] = useState<ScansModel[]>([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { result } = await getScans();
      const today = format(new Date(), formatDate.from);

      const checkoutsResult = result
        ? result.filter(x => x.check_out_date.toString() === today)
        : [];
      const checkinsResult = result
        ? result.filter(
            x => x.check_in_date && x.check_in_date.toString() === today
          )
        : [];

      setCheckouts(checkoutsResult);
      setCheckins(checkinsResult);
    })();
  }, []);

  const toggleScan = () => {
    dispatch(ScannerToggleAction());
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleScan()}
          startIcon={<div>{Icons.Barcode}</div>}
          fullWidth
          className={classes.barcodeButton}
        >
          Checkin / Checkout
        </Button>
      </Grid>

      <HomePageTile title="Checkouts Today" indicator={<CheckoutIndicator />}>
        <CheckInOut scans={checkouts}></CheckInOut>
      </HomePageTile>

      <HomePageTile title="Checkins Today" indicator={<CheckinIndicator />}>
        <CheckInOut scans={checkins}></CheckInOut>
      </HomePageTile>

      <HomePageTile title="Books Overdue" indicator={<OverdueIndicator />}>
        <Overdue />
      </HomePageTile>

      <HomePageTile title="Birthdays Today" indicator={<BirthdayIndicator />}>
        <BirthdaysToday />
      </HomePageTile>
    </Grid>
  );
};

const HomePageTile = ({ title, children, indicator }: HomePageTileProps) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.items} xs={12} md={6} lg={4}>
      <Paper className={classes.homePageContainer}>
        <div className={classes.titleContainer}>
          <div className={classes.indicator}>{indicator}</div>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
        </div>
        <div className={classes.content}>{children}</div>
      </Paper>
    </Grid>
  );
};
export default Home;
