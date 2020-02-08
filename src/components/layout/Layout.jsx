import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from './Layout.config.json';
import Drawer from './Drawer';
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Teacher from 'pages/teacher/Teacher';
import Student from '../../pages/student/Student';
import Class from 'pages/class/Class';
import Home from 'pages/home';
import { Provider } from 'utils/context';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
}));

const contextDefault = {
	updateContext: () => {}
}



export default function PermanentDrawerLeft() {
	const classes = useStyles();
	const [context, setContext] = useState(contextDefault);
	context.updateContext = state => setContext({...state});

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Provider value={context}>
				<AppBar position='fixed' className={classes.appBar}>
					<Toolbar>
						<Typography variant='h6' noWrap>
							Permanent drawer
						</Typography>
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
							<Route exact path='/contactus'>
								<p>Contact Us</p>
							</Route>
							<Route exact path='/aboutus'>
								<p>About us</p>
							</Route>
						</Switch>
						<Route exact path='/checkout'>
							<p>Checkout</p>
						</Route>
					</main>
				</Router>
			</Provider>
		</div>
	);
}
