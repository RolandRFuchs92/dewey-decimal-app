import { GetStudentBooksHistoryModel } from 'pages/books/Book.type';

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

export type TableStudentSchema = {
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
  class_name: string;
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

export type StudentSearchGET = {
  namepart: string;
};

export type StudentProfileGET = {
  student_id: number;
};

export type StudentSelectListSearchModel = {
  text: string;
  value: string;
  class: string;
  teacher: string;
};

export const studentSchemaKeys = [
  'student_id',
  'first_name',
  'last_name',
  'birthdate',
  'mother_name',
  'mother_mobile',
  'mother_email',
  'father_name',
  'father_email',
  'father_mobile',
  'class_id',
  'is_active'
];
