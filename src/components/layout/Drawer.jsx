import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MainMenuOptions from './MainMenuOptions';

import { drawerWidth, mainMenu } from './Layout.config.json';

const useStyles = makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	toolbar: theme.mixins.toolbar,
}));

export default function MainLayoutDrawer() {
	const classes = useStyles();

	return (
		<>
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor='left'
			>
				<div className={classes.toolbar} />
				<Divider />
				<MainMenuOptions menuItems={mainMenu}></MainMenuOptions>
			</Drawer>
		</>
	);
}
