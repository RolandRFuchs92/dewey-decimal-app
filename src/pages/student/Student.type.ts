import { GetStudentBooksHistoryModel } from 'pages/books/Book.type';
import { StringLiteral } from 'typescript';

export type StudentSchema = {
  student_id: number;
  first_name: string;
  last_name: string;
  birthdate: string;
  mother_mobile: string;
  mother_email: string;
  mother_name: string;
  father_name: string;
  father_mobile: string;
  father_email: string;
  class_id: number;
  is_active: boolean;
};

export type StudentModel = {
  student_id: number;
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

export type GetStudentsWithBirthdaysModel = {
  first_name: string;
  last_name: string;
  birthdate: Date;
  grade: number;
  class_name: string;
  teacher: string;
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

export type StudentSelectListSearchModel = {
  text: string;
  value: string;
  class: string;
  teacher: string;
};
