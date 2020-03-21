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
  studentData: StudentModel;
  historyData: BookHistoryModel[];
};

export type BookHistoryModel = {
  check_in_date?: string;
  return_on: string;
  book_name: string;
  author_name: string;
};

export type StudentBookHistoryProps = {
  hst: BookHistoryModel[];
};

export type StudentProfileProps = {
  open: boolean;
  handleClose: () => void;
  studentId?: number;
};
