import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import Home from 'pages/home';
import Student from 'pages/student/Student';
import Teacher from 'pages/teacher/Teacher';
import Class from 'pages/class/Class';
import DeweySystem from 'pages/deweySystem';
import Authors from 'pages/authors';
import Books from 'pages/books';
import BooksOut from 'pages/booksOut';
import Admin from 'pages/admin';

import { drawerWidth, smDrawerWidth } from 'layout.json';
import { ScannerToggleAction } from 'pages/scan/Scanner.action';
import Icons from 'components/icons';
import { RootReducerModel } from 'utils/redux/rootReducer.type';
import { toggleThemeAction } from 'components/theme/Theme.action';
import { getScans } from 'pages/booksOut/Booksout.service';

import Drawer from './drawer';
import { PermanentDrawerLeftModel } from './Layout.type';
import { processScansData } from 'pages/home/Home.service';
import { setPageTitle } from 'utils/redux/global.action';
import { mapWindowPathNameToPageTitle } from 'utils/businessRules';
import { updateScans } from 'pages/home/Home.action';

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex'
    },
    toolbarRoot: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignSelf: 'center'
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      [theme.breakpoints.down('sm')]: {
        left: 0,
        marginLeft: smDrawerWidth,
        width: `calc(100% - ${smDrawerWidth}px)`
      }
    },
    toolbar: theme.mixins.toolbar,
    toolbarCenter: {
      color: theme.palette.primary.contrastText,
      alignSelf: 'center'
    },
    toggleMode: {
      fontSize: 30
    },

    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        width: `calc(100% - ${smDrawerWidth}px)`,
        padding: 5
      }
    },
    iconText: {
      color: theme.palette.primary.contrastText
    }
  };
});

export function PermanentDrawerLeft({ pageTitle }: PermanentDrawerLeftModel) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateScans());
    const currentPage = window.location.pathname;
    const pageTitleAction = setPageTitle(
      mapWindowPathNameToPageTitle(currentPage)
    );
    dispatch(pageTitleAction);
  }, []);

  const toggleScan = () => {
    dispatch(ScannerToggleAction());
  };

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.toolbarRoot}>
            <Typography variant="h5" noWrap className={classes.toolbarCenter}>
              {pageTitle}
            </Typography>
            <div className={classes.toggleMode}>
              <IconButton
                aria-label="Checkin/out"
                className={classes.iconText}
                onClick={() => toggleScan()}
              >
                {Icons.Barcode}
              </IconButton>
              <IconButton
                aria-label="Toggle light/dark mode"
                onClick={toggleTheme}
                className={classes.iconText}
              >
                {Icons.DarkLight}
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Router>
        <Drawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/students">
              <Student />
            </Route>
            <Route exact path="/school/class">
              <Class />
            </Route>
            <Route exact path="/school/teacher">
              <Teacher />
            </Route>
            <Route exact path="/library/dewey">
              <DeweySystem />
            </Route>
            <Route exact path="/library/author">
              <Authors />
            </Route>
            <Route exact path="/library/books">
              <Books />
            </Route>
            <Route exact path="/library/booksout">
              <BooksOut />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

const mapStateToProps = (state: RootReducerModel) => {
  return {
    pageTitle: state.global.pageTitle
  };
};

export default connect(mapStateToProps)(PermanentDrawerLeft);
