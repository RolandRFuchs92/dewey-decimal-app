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
	faBookReader, 
	faSitemap
} from '@fortawesome/free-solid-svg-icons';

function createIcon(icon){ 
	return <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
}

const Edit = createIcon(faEdit);
const Add = createIcon(faPlusSquare);
const Delete = createIcon(faMinusSquare);
const Barcode = createIcon(faBarcode);
const Scan = createIcon(faWifi);
const Author = createIcon(faFeatherAlt);
const Books = createIcon(faBookReader);
const DeweySystem = createIcon(faSitemap);

const Thing = <>{<Rowing></Rowing>}</>;

export default { 
    Code: <Code />,
    Store: <Store />,
    Birthday: <Cake />,
	Class: <School/>,
	Teacher: <EmojiPeople/>,
	Home: <Home />, 
	Menu: <MenuBook/>,
	School: <School/>,
	Student: <AirlineSeatReclineExtra />,
	Class: <SupervisedUserCircle />,
	ExpandLess,
	ExpandMore,

    Edit,
	Add,
	Delete,
	Barcode,
	Scan,
	Author,
	Books,
	DeweySystem 
}