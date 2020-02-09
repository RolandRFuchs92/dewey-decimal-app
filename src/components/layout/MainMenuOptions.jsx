import React, { useState } from 'react';
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

const useStyles = makeStyles(theme => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const ExpandLess = icons.ExpandLess;
const ExpandMore = icons.ExpandMore;

function MenuOptions(props) {
	const { menuItems } = props;

	return (
		<List disablePadding>
			{menuItems.map(({ label, icon, path, menuItems }) => (
				<CreateListItem
					key={label}
					{...{ label, icon, path, menuItems, props }}
				></CreateListItem>
			))}
		</List>
	);
}

function CreateListItem({ label, icon, path, menuItems, props }) {
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState(false);
	const hasMenuItems = !isNil(menuItems);

	const pushPath = path => {
		if (isNil(path)) {
			setIsOpen(!isOpen);
			return;
		}
		props.history.push(path);
	};
	const Icon = icons[upperFirst(icon)]
	return (
		<>
			<ListItem button key={label} onClick={() => pushPath(path)}>
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