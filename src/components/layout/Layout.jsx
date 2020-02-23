import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from './Layout.config.json';
import Drawer from './Drawer';
import { CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Teacher from 'pages/teacher/Teacher';
import Student from 'pages/student/Student';
import Class from 'pages/class/Class';
import Home from 'pages/home';
import DeweySystem from 'pages/deweySystem';
import Authours from 'pages/authors'
import Books from 'pages/books';
import BooksOut from 'pages/booksOut';
import context from 'utils/context';
import Icons from 'components/icons';

const useStyles = makeStyles(theme => {
	return {
		root: {
			display: 'flex',
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
		},
		toolbar: theme.mixins.toolbar,
		toolbarCenter: {
			color: theme.palette.primary.contrastText,
			alignSelf: 'center'
		},
		toggleMode: {
			fontSize:30
		},
		
		content: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.default,
			padding: theme.spacing(3),
		},
		iconText: {
			color: theme.palette.primary.contrastText,
		}
	}
});

export default function PermanentDrawerLeft() {
	const classes = useStyles();
	const {state, toggleTheme, toggleScan} = useContext(context);

	return (
		<div className={classes.root}>
			<CssBaseline />
				<AppBar position='fixed' className={classes.appBar}>
					<Toolbar>
						<div className={classes.toolbarRoot}>
							<Typography variant='h5' noWrap className={classes.toolbarCenter}>
								{state.pageTitle}
							</Typography>
							<div className={classes.toggleMode} >
								<IconButton aria-label="delete" className={classes.iconText} onClick={toggleScan}>
									{Icons.Barcode}
								</IconButton>
								<IconButton aria-label="Toggle light/dark mode" onClick={toggleTheme} className={classes.iconText}>
									{Icons.DarkLight}
								</IconButton>
							</div>
						</div>
					</Toolbar>
				</AppBar>
				<Router>
					<Drawer></Drawer>
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<Switch>
							<Route exact path="/">
								<Redirect to="/home"></Redirect>
							</Route>
							<Route exact path='/home'>
								<Home></Home>
							</Route>
							<Route exact path='/students'>
								<Student></Student>
							</Route>
							<Route exact path='/school/class'>
								<Class></Class>
							</Route>
							<Route exact path="/school/teacher">
								<Teacher></Teacher>
							</Route>
							<Route exact path='/library/dewey'>
								<DeweySystem></DeweySystem>
							</Route>
							<Route exact path='/library/author'>
								<Authours></Authours>	
							</Route>
							<Route exact path='/library/books'>
								<Books></Books>
							</Route>
							<Route exact path='/library/booksout'>
								<BooksOut></BooksOut>
							</Route>
						</Switch>
					</main>
				</Router>
		</div>
	);
}
