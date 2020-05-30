import React, { useState, useEffect } from 'react';
import { Button, makeStyles, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

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
import { processScansData } from './Home.service';
import { RootReducerModel } from 'utils/redux/rootReducer.type';

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
  const { checkouts, checkins } = useSelector(
    ({ home: { checkinsToday, checkoutsToday } }: RootReducerModel) => {
      return {
        checkouts: checkoutsToday,
        checkins: checkinsToday
      };
    }
  );
  const classes = useStyles();
  const dispatch = useDispatch();

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

      <HomePageTile
        cy="checkout-tile"
        title="Checkouts Today"
        indicator={<CheckoutIndicator />}
      >
        <CheckInOut scans={checkouts} isCheckin={false} />
      </HomePageTile>

      <HomePageTile
        cy="checkin-tile"
        title="Checkins Today"
        indicator={<CheckinIndicator />}
      >
        <CheckInOut scans={checkins} isCheckin />
      </HomePageTile>

      <HomePageTile
        cy="overdue-tile"
        title="Books Overdue"
        indicator={<OverdueIndicator />}
      >
        <Overdue />
      </HomePageTile>

      <HomePageTile
        cy="brithdays-tile"
        title="Birthdays Today"
        indicator={<BirthdayIndicator />}
      >
        <BirthdaysToday />
      </HomePageTile>
    </Grid>
  );
};

const HomePageTile = ({
  title,
  children,
  indicator,
  cy
}: HomePageTileProps) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.items} xs={12} md={6} lg={4} data-cy={cy}>
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
