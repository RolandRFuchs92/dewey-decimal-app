import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Drawer, Divider } from '@material-ui/core';

import Indicators from 'components/icons/Indicator';
import config from 'layout.json';

import MainMenuOptions from '../mainMenuOptions';
import { loadInitialAppState } from '../Layout.service';

const { drawerWidth, mainMenu } = config;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: 50
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      width: 50
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  floatIcons: {
    padding: theme.mixins.gutters().padding,
    position: 'absolute'
  }
}));

const testClass = 'permadrawer';

export default function MainLayoutDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await loadInitialAppState(dispatch);
    })();
  }, [dispatch]);

  return (
    <>
      <Drawer
        className={`${classes.drawer} ${testClass}`}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <Indicators />
        <div className={classes.toolbar} />
        <Divider />
        <MainMenuOptions menuItems={mainMenu} dataTestId={testClass} />
      </Drawer>
    </>
  );
}
