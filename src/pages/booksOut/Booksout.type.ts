export type BooksOverdueModel = {
  student_name: string;
  book_name: string;
  author_name: string;
  return_on: Date;
};

export type GetAllModel = {
  books_out_id: string;
  book_id: string;
  student_id: string;
  check_out_date: Date;
  check_in_date: Date;
  student_name: string;
  book_name: string;
  return_on: Date;
};

export type ScansModel = {
  teacher: string;
  class: string;
  book: string;
  author: string;
  student: string;
  check_in_date: Date;
  check_out_date: Date;
};

export type BooksModel = {
  book_id: number;
  author_id: number;
  decimal_id: number;
  call_number: string;
  name: string;
  publisher: string;
  created_on: Date;
};

export type RecentlyCheckoutModel = {
  return_on: Date;
  student_name: string;
  grade: number;
  class_name: string;
};

export const book_out_keys = [
  'books_out_id',
  'book_id',
  'student_id',
  'return_on',
  'check_out_date',
  'check_in_date'
];
