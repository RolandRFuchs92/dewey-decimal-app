import React from "react";
import {
  Home,
  Code,
  Store,
  Cake,
  MenuBook,
  ExpandLess,
  ExpandMore,
  Print
} from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faAdjust,
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
  faUsers,
  faBookReader,
  faHistory,
  faFolderPlus,
  faFolderMinus,
  faUserClock,
  faMobileAlt,
  faRecordVinyl,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

function CreateIcon(icon: IconDefinition) {
  return <FontAwesomeIcon icon={icon}></FontAwesomeIcon>;
}

const Warning = CreateIcon(faExclamationTriangle);
const LaptopCamera = CreateIcon(faRecordVinyl);
const UsePhone = CreateIcon(faMobileAlt);
const Overdue = CreateIcon(faUserClock);
const Checkin = CreateIcon(faFolderPlus);
const Checkout = CreateIcon(faFolderMinus);
const History = CreateIcon(faHistory);
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
const BookOut = CreateIcon(faBookReader);
const DarkLight = CreateIcon(faAdjust);

const defaultExport: { [key: string]: JSX.Element } = {
  Code: <Code />,
  Store: <Store />,
  Birthday: <Cake />,
  Home: <Home />,
  Menu: <MenuBook />,
  Class: studentClass,
  Print: <Print />,

  ExpandLess: <ExpandLess />,
  ExpandMore: <ExpandMore />,
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
  Teacher,
  BookOut,
  History,
  DarkLight,
  Checkin,
  Checkout,
  Overdue,
  UsePhone,
  LaptopCamera,
  Warning
};

export default defaultExport;
