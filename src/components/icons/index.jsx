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

function createIcon(icon){ 
	return <FontAwesomeIcon icon={icon} style={{fontSize:18}}></FontAwesomeIcon>
}

const Edit = createIcon(faEdit);
const Add = createIcon(faPlusSquare);
const Delete = createIcon(faMinusSquare);
const Barcode = createIcon(faBarcode);
const Scan = createIcon(faWifi);
const Author = createIcon(faFeatherAlt);
const Books = createIcon(faBookOpen);
const DeweySystem = createIcon(faSitemap);
const FaSchool = createIcon(faSchool);
const Admin = createIcon(faUserCog);
const Student = createIcon(faUserGraduate);
const Teacher = createIcon(faChalkboardTeacher);
const studentClass = createIcon(faUsers);

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