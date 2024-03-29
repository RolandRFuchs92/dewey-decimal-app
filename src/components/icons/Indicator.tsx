import React, { useState, useEffect } from 'react';
import { Badge, makeStyles } from '@material-ui/core';
import { deepPurple, lightGreen, grey } from '@material-ui/core/colors';
import { connect } from 'react-redux';

import Icons from './index';
import { indicatorRootModel, indicatorModel } from './Icons.type';
import { HomeReducerCountOnly } from 'pages/home/Home.type';
import { AdminReducerModel } from 'pages/admin/Admin.reducer';

const useStyles = makeStyles(theme => {
  return {
    indicators: {
      display: 'flex',
      position: 'absolute',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'baseline',
      padding: 15,
      height: 64,
      fontSize: 23,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
        width: 0,
        height: 0
      }
    },
    checkin: {
      color: theme.palette.primary.light
    },
    checkout: {
      color: theme.palette.info.light
    },
    birthday: {
      color: deepPurple[300]
    },
    Overdue: {
      color: theme.palette.warning.light,
      '& span': {
        marginBottom: 4
      },
      fontSize: 23,
      paddingBottom: 2
    },
    applicationErrors: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      background: 'rgba(255, 0, 0, 0.7)',
      padding: '5px 5px 0px 5px',
      borderRadius: '5px 5px 0px 0px',
      color: 'white'
    }
  };
});

export default () => {
  const classes = useStyles();

  useEffect(() => {});

  return (
    <div className={classes.indicators}>
      <CheckoutIndicator />
      <CheckinIndicator />
      <BirthdayIndicator />
      <OverdueIndicator />
    </div>
  );
};

export const Indicator = ({ count, icon, className }: indicatorRootModel) => {
  return (
    <div className={className}>
      <Badge badgeContent={count} color="secondary">
        {icon}
      </Badge>
    </div>
  );
};

export const RawCheckinIndicator = ({ count }: indicatorModel) => {
  const classes = useStyles();

  return (
    <Indicator
      count={count}
      icon={Icons.Checkin}
      className={classes.checkin}
    ></Indicator>
  );
};
export const RawCheckoutIndicator = ({ count }: indicatorModel) => {
  const classes = useStyles();

  return (
    <Indicator
      count={count}
      icon={Icons.Checkout}
      className={classes.checkout}
    ></Indicator>
  );
};

export const RawOverdueIndicator = ({ count }: indicatorModel) => {
  const classes = useStyles();

  return (
    <Indicator
      count={count}
      icon={Icons.Overdue}
      className={classes.Overdue}
    ></Indicator>
  );
};
export const RawBirthdayIndicator = ({ count }: indicatorModel) => {
  const classes = useStyles();
  return (
    <Indicator
      count={count}
      icon={Icons.Birthday}
      className={classes.birthday}
    ></Indicator>
  );
};

export const RawErrorIndicator = ({ count }: indicatorModel) => {
  const classes = useStyles();
  if (!count) return null;
  return (
    <span className={classes.applicationErrors}>
      {Icons.Warning} {count} application errors.
    </span>
  );
};

const genericMapStateToProps = (
  stateTree: string,
  stateTreeChild: keyof HomeReducerCountOnly | keyof AdminReducerModel
) => {
  return (
    currentState: { [key: string]: any },
    ownProps: { [key: string]: any }
  ) => {
    return {
      ...ownProps,
      count: currentState[stateTree][stateTreeChild]
    };
  };
};

export const BirthdayIndicator = connect(
  genericMapStateToProps('home', 'birthdaysToday')
)(RawBirthdayIndicator);
export const OverdueIndicator = connect(
  genericMapStateToProps('home', 'booksOverdue')
)(RawOverdueIndicator);
export const CheckoutIndicator = connect(
  genericMapStateToProps('home', 'checkoutCountForToday')
)(RawCheckoutIndicator);
export const CheckinIndicator = connect(
  genericMapStateToProps('home', 'checkinCountForToday')
)(RawCheckinIndicator);
export const ErrorIndicator = connect(
  genericMapStateToProps('admin', 'errorCount')
)(RawErrorIndicator);
