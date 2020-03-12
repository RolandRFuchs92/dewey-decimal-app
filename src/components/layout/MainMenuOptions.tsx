import React, { useState, useContext, Dispatch } from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	makeStyles,
	withStyles
} from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import { isNil, upperFirst } from 'lodash';

import Icons from 'components/icons';
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

const ExpandLess = Icons.ExpandLess;
const ExpandMore = Icons.ExpandMore;
let prevSelected;

function MenuOptions({ menuItems } : CreateListItemModel) {
	const classes = useStyles();
	const handleSelected = (setSelected: Dispatch<boolean> )=> {
		setSelected(true);
		prevSelected = setSelected;
	}

	return (
		<List disablePadding className={classes.list}>
			{menuItems.map((menuItem) => {
				const { label, icon, path, menuItems }: CreateListItemModel = menuItem;
				return (
				<CreateListItem
					key={label}
					{...{ label, icon, path, menuItems, handleSelected }}
				/>
			)})
		}
		</List>
	);
}

type CreateListItemModel ={ 
	label: string;
	icon: string; 
	path: string;
	menuItems: CreateListItemModel[];
	handleSelected: (callback: Dispatch<boolean>) => void
}

function CreateListItem({ label, icon, path, menuItems, handleSelected }: CreateListItemModel) {
	const classes = useStyles();
	const history = useHistory();
	const [isOpen, setIsOpen] = useState(false);
	const hasMenuItems = !isNil(menuItems);
	const [selected, setSelected] = useState<boolean>(false);

	const handleMenuItemClick = (path: string) => {
		if(!hasMenuItems){
			handleSelected(setSelected);
		}
		
		if (isNil(path)) {
			setIsOpen(!isOpen);
			return;
		}
		history.push(path);
	};
	const Icon = Icons[upperFirst(icon)]
	return (
		<>
			<ListItem selected={selected} button key={label} onClick={() => handleMenuItemClick(path)} className={classes.menuItem} >
				<ListItemIcon>
					{Icon}
				</ListItemIcon>
				<ListItemText primary={label} />
				{hasMenuItems ? isOpen ? {ExpandLess} : {ExpandMore} : null}
			</ListItem>
			{hasMenuItems && (
				<Collapse in={isOpen} className={classes.nested}>
					<MenuOptions 	{...{ label, icon, path, menuItems, handleSelected }} menuItems={menuItems}></MenuOptions>
				</Collapse>
			)}
		</>
	);
}

export default withRouter(MenuOptions);