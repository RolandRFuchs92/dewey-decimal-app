import React, { useState, useContext } from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	makeStyles,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { isNil, upperFirst } from 'lodash';

import icons from 'components/icons';
import context from 'utils/context';

const useStyles = makeStyles(theme => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const ExpandLess = icons.ExpandLess;
const ExpandMore = icons.ExpandMore;
let prevSelected;

function MenuOptions(props) {
	const { menuItems } = props;
	const handleSelected = setSelected => {
		prevSelected && prevSelected(false);
		setSelected(true);
		prevSelected = setSelected;
	}

	return (
		<List disablePadding>
			{menuItems.map(({ label, icon, path, menuItems }) => (
				<CreateListItem
					key={label}
					{...{ label, icon, path, menuItems, props, handleSelected }}
				></CreateListItem>
			))}
		</List>
	);
}

function CreateListItem({ label, icon, path, menuItems, props, handleSelected }) {
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState(false);
	const hasMenuItems = !isNil(menuItems);
	const appContext = useContext(context);
	const [selected, setSelected] = useState(false);

	const handleMenuItemClick = path => {
		if(!hasMenuItems){
			debugger;
			appContext.setState({...appContext, pageTitle: label});
			handleSelected(setSelected);
		}
		
		if (isNil(path)) {
			setIsOpen(!isOpen);
			return;
		}
		props.history.push(path);
	};
	const Icon = icons[upperFirst(icon)]
	return (
		<>
			<ListItem selected={selected} button key={label} onClick={() => handleMenuItemClick(path)}>
				<ListItemIcon>
					{Icon}
				</ListItemIcon>
				<ListItemText primary={label} />
				{hasMenuItems ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
			</ListItem>
			{hasMenuItems && (
				<Collapse in={isOpen} className={classes.nested}>
					<MenuOptions {...props} menuItems={menuItems}></MenuOptions>
				</Collapse>
			)}
		</>
	);
}

export default withRouter(MenuOptions);