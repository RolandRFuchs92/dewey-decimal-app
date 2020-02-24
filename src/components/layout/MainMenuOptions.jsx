import React, { useState, useContext } from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	makeStyles,
	withStyles
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { isNil, upperFirst } from 'lodash';

import icons from 'components/icons';
import context from 'utils/context';

const useStyles = makeStyles(theme => {
	return {
		list: {
			overflow: 'hidden'
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
		menuItem: {
			'&:after': {
				content: '""',
					height: 3,
					width: '100%',
					position: 'absolute',
					bottom:0,
					backgroundColor: 'white',
					transition: 'all cubic-bezier(0, 0, 0.2, 1) 1s',
					right: -200,
					opacity: 0
			},
			'&.Mui-selected': {
				'&:after': {
					background: `linear-gradient(to right, white 15px, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 85%, ${theme.palette.primary.dark})`,
					right:0,
					opacity: 1
				}
			}
		}
	}
});

const StyledListItem = withStyles({
	
})(ListItem);

const ExpandLess = icons.ExpandLess;
const ExpandMore = icons.ExpandMore;
let prevSelected;



function MenuOptions(props) {
	const classes = useStyles();
	const { menuItems } = props;
	const handleSelected = setSelected => {
		prevSelected && prevSelected(false);
		setSelected(true);
		prevSelected = setSelected;
	}

	return (
		<List disablePadding className={classes.list}>
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
	const { state: appContext} = useContext(context);
	const [selected, setSelected] = useState(false);

	const handleMenuItemClick = path => {
		if(!hasMenuItems){
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
			<ListItem selected={selected} button key={label} onClick={() => handleMenuItemClick(path)} className={classes.menuItem} >
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