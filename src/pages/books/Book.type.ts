export type BookModel = {
  book_id: number;
  author_id: number;
  decimal_id: number;
  call_number: string;
  name: string;
  publisher: string;
  created_on: Date;
};

export type GetStudentBooksHistoryModel = {
  student_id: number;
  author_name: string;
  book_name: string;
  check_out_date: Date;
  check_in_date: Date;
  return_on: Date;
};

export type GetBookCallNumberModel = {
  books_out_id: number;
  book_id: number;
  book_name: string;
  author_name: string;
  call_number: string;
  student_name: string;
  class: string;
  teacher_name: string;
  check_out_date: Date;
  return_on: Date;
  check_in_date: Date;
};
