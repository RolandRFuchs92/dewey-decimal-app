import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Drawer, Divider } from '@material-ui/core';

import Indicators from 'components/icons/Indicator';

import MainMenuOptions from '../mainMenuOptions';
import config from '../Layout.config.json';
import { loadInitialAppState } from '../Layout.service';

const { drawerWidth, mainMenu } = config;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
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
