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
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { 
	faEdit, 
	faPlusSquare, 
	faMinusSquare, 
	faBarcode, 
	faWifi, 
	faFeatherAlt, 
	faBookOpen, 
	faSitemap,
	faSchool,
	faUserCog,
	faUserGraduate,
	faChalkboardTeacher,
	faUsers
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
	faIcons: {
		fontSize: 18
	}
}));

function CreateIcon(icon){ 
	return <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
}

const Edit = CreateIcon(faEdit);
const Add = CreateIcon(faPlusSquare);
const Delete = CreateIcon(faMinusSquare);
const Barcode = CreateIcon(faBarcode);
const Scan = CreateIcon(faWifi);
const Author = CreateIcon(faFeatherAlt);
const Books = CreateIcon(faBookOpen);
const DeweySystem = CreateIcon(faSitemap);
const FaSchool = CreateIcon(faSchool);
const Admin = CreateIcon(faUserCog);
const Student = CreateIcon(faUserGraduate);
const Teacher = CreateIcon(faChalkboardTeacher);
const studentClass = CreateIcon(faUsers);

export default { 
    Code: <Code />,
    Store: <Store />,
    Birthday: <Cake />,
	Class: <School/>,
	Home: <Home />, 
	Menu: <MenuBook/>,
	Class: studentClass,

	ExpandLess,
	ExpandMore,
	School: FaSchool,
    Edit,
	Add,
	Delete,
	Barcode,
	Scan,
	Author,
	Books,
	DeweySystem,
	Admin,
	Student,
	Teacher
}