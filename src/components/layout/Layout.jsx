import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from './Layout.config.json';
import Drawer from './Drawer';
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Student from '../../pages/student/Student';

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

export default function PermanentDrawerLeft() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
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
						<Route exact path='/students'>
							<Student>Store</Student>
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
		</div>
	);
}
