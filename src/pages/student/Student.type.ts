import { GetStudentBooksHistoryModel } from 'pages/books/Book.type';

export type StudentModel = {
  first_name: string;
  last_name: string;
  birthdate: string;
  mother_mobile: string;
  mother_email: string;
  mother_name: string;
  father_name: string;
  father_mobile: string;
  father_email: string;
  grade: number;
  class_name: string;
};

export type StudentCardProps = {
  studentData?: StudentModel;
  historyData?: GetStudentBooksHistoryModel[];
};

export type StudentBookHistoryProps = {
  hst?: GetStudentBooksHistoryModel[];
};

export type StudentProfileProps = {
  open: boolean;
  handleClose: () => void;
  studentId?: number;
};
