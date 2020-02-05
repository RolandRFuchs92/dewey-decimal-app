import React, { useState } from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	makeStyles,
} from '@material-ui/core';
// import {
// 	AirlineSeatReclineExtra,
// 	Home,
// 	Code,
// 	Store,
// 	Rowing,
// 	Cake,
// 	MenuBook,
// 	School,
// 	EmojiPeople,
// 	SupervisedUserCircle,
// 	ExpandLess,
// 	ExpandMore,
// } from '@material-ui/icons';
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
					<Icon></Icon>
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

// function Icon({ iconName }) {
// 	switch (iconName) {
// 		case 'teacher':
// 			return <EmojiPeople />
// 		case 'home':
// 			return <Home></Home>;
// 		case 'code':
// 			return <Code></Code>;
// 		case 'store':
// 			return <Store></Store>;
// 		case 'rowing':
// 			return <Rowing></Rowing>;
// 		case 'birthday':
// 			return <Cake></Cake>;
// 		case 'menu':
// 			return <MenuBook></MenuBook>;
// 		case 'school':
// 			return <School />;
// 		case 'student':
// 			return <AirlineSeatReclineExtra/>;
// 		case 'class':
// 			return <SupervisedUserCircle></SupervisedUserCircle>;
// 		default:
// 			return null;
// 	}
// }
