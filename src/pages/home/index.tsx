import React, { useState, useEffect } from 'react';
import { Button, makeStyles, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

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

const useStyles = makeStyles(() => {
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
      margin: '0px 15px 15px 0px'
    },
    barcodeButton: {
      marginBottom: 15,
      fontSize: 30,
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

      const checkoutsResult = result.filter(x => x.check_in_date === null);
      const checkinsResult = result.filter(x => x.check_in_date !== null);

      setCheckouts(checkoutsResult);
      setCheckins(checkinsResult);
    })();
  }, []);

  const toggleScan = () => {
    dispatch(ScannerToggleAction());
  };

  return (
    <Grid container>
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
    <Grid item className={classes.items}>
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
