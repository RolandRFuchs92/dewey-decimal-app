import React from 'react';
import {
	AirlineSeatReclineExtra,
	Home,
	Code,
	Store,
	Rowing,
	Cake,
	MenuBook,
	School,
	EmojiPeople,
	SupervisedUserCircle,
	ExpandLess,
	ExpandMore,
} from '@material-ui/icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusSquare, faMinusSquare} from '@fortawesome/free-solid-svg-icons';

const createIcon = icon => <FontAwesomeIcon icon={icon}></FontAwesomeIcon>

const Edit = createIcon(faEdit);
const Add = createIcon(faPlusSquare);
const Delete = createIcon(faMinusSquare);
export default { 
    Edit,
    Home,
    Code,
    Store,
    Birthday: Cake,
	Class: School,
	Teacher: EmojiPeople,
	Home: Home,
	Menu: MenuBook,
	School,
	Student: AirlineSeatReclineExtra,
	Class: SupervisedUserCircle,
	ExpandLess: ExpandLess,
	ExpandMore: ExpandMore,
	Add,
	Delete
}