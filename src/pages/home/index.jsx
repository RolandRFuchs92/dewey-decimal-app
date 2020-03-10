import React, { useEffect, useState, useContext } from "react";
import { Button, makeStyles, Grid, Paper, Typography } from "@material-ui/core";

import { Provider } from "./Context";
import { getScans } from "pages/booksOut/booksout.repo";
import ScansToday from "./ScansTemplate";
import BirthdaysToday from "./BirthdaysToday";
import Icons from "components/icons";
import Overdue from "./Overdue";
import { formatDateForDbInsert } from "utils/businessRules";
import rootContext from "utils/context";
import {
  CheckinIndicator,
  CheckoutIndicator,
  OverdueIndicator,
  BirthdayIndicator
} from "components/icons/Indicator";

const useStyles = makeStyles(theme => {
  return {
    container: {
      // display: 'flex',
    },
    homePageContainer: {
      padding: 15,
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    title: {
      paddingBottom: 15
    },
    items: {
      width: 500,
      height: 350,
      margin: "0px 15px 15px 0px"
    },
    barcodeButton: {
      marginBottom: 15,
      fontSize: 30,
      "& svg": {
        fontSize: 47
      }
    },
    content: {
      textAlign: "left",
      overflow: "overlay"
    },
    titleContainer: {
      position: "relative",
      display: "flex",
      justifyContent: "center"
    },
    indicator: {
      position: "absolute",
      left: 0,
      fontSize: 23
    }
  };
});

export default () => {
  const classes = useStyles();
  const [scans, setScans] = useState({});
  const { toggleScan, setUpdateScans } = useContext(rootContext);

  const resetScansToday = async () => {
    const rawScans = await getScans();
    const checkins = rawScans.filter(
      ({ check_in_date }) => check_in_date === formatDateForDbInsert()
    );
    const checkouts = rawScans.filter(
      ({ check_out_date }) => check_out_date === formatDateForDbInsert()
    );
    setScans({
      checkins,
      checkouts
    });
  };

  useEffect(() => {
    (async () => {
      await resetScansToday();
    })();
    setUpdateScans({ update: resetScansToday });
    return () => {
      setUpdateScans({ update: () => {} });
    };
  }, [setUpdateScans]);

  return (
    <Provider value={resetScansToday}>
      <Grid container className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleScan(resetScansToday)}
          startIcon={<div>{Icons.Barcode}</div>}
          fullWidth
          className={classes.barcodeButton}
        >
          Checkin / Checkout
        </Button>

        <HomePageTile title="Checkouts Today" indicator={<CheckoutIndicator />}>
          <ScansToday scans={scans.checkouts}></ScansToday>
        </HomePageTile>

        <HomePageTile title="Checkins Today" indicator={<CheckinIndicator />}>
          <ScansToday scans={scans.checkins}></ScansToday>
        </HomePageTile>

        <HomePageTile title="Books Overdue" indicator={<OverdueIndicator />}>
          <Overdue></Overdue>
        </HomePageTile>

        <HomePageTile title="Birthdays Today" indicator={<BirthdayIndicator />}>
          <BirthdaysToday></BirthdaysToday>
        </HomePageTile>
      </Grid>
    </Provider>
  );
};

const HomePageTile = ({ title, titleComponent, children, indicator }) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.items}>
      <Paper className={classes.homePageContainer}>
        <div className={classes.titleContainer}>
          <div className={classes.indicator}>{indicator}</div>
          {title ? (
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
          ) : (
            titleComponent
          )}
        </div>
        <div className={classes.content}>{children}</div>
      </Paper>
    </Grid>
  );
};
