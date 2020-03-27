import React from 'react';
import { Button, makeStyles, Grid, Paper, Typography } from '@material-ui/core';

import ScansToday from './ScansTemplate';
import BirthdaysToday from './BirthdaysToday';
import Icons from 'components/icons';
import Overdue from './Overdue';

import {
  CheckinIndicator,
  CheckoutIndicator,
  OverdueIndicator,
  BirthdayIndicator
} from 'components/icons/Indicator';
import { HomePageTileProps, ScansModel, HomeProps } from './Home.type';
import { connect, useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => {
  return {
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

export const Home = ({ checkins, checkouts }: HomeProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const toggleScan = () => {
    dispatch({ type: 'nothing' });
  };

  // const resetScansToday = async () => {
  //   const rawScans = await getScans();
  //   const checkins = rawScans.filter(
  //     ({ check_in_date }) => check_in_date === formatDateForDbInsert()
  //   );
  //   const checkouts = rawScans.filter(
  //     ({ check_out_date }) => check_out_date === formatDateForDbInsert()
  //   );

  //   setScans({
  //     checkins,
  //     checkouts
  //   });
  // };

  return (
    <Grid container className={classes.container}>
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
        <ScansToday scans={checkouts}></ScansToday>
      </HomePageTile>

      <HomePageTile title="Checkins Today" indicator={<CheckinIndicator />}>
        <ScansToday scans={checkins}></ScansToday>
      </HomePageTile>

      {/* <HomePageTile title="Books Overdue" indicator={<OverdueIndicator />}>
        <Overdue></Overdue>
      </HomePageTile> */}

      <HomePageTile title="Birthdays Today" indicator={<BirthdayIndicator />}>
        <BirthdaysToday></BirthdaysToday>
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

const mapStateToProps = (
  state: {
    checkouts: ScansModel[];
    checkins: ScansModel[];
  },
  ownProps: any
) => {
  return {
    checkouts: state.checkouts,
    checkins: state.checkins
  };
};

export default connect(mapStateToProps)(Home);
