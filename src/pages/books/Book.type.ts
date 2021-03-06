export type GetStudentBooksHistoryModel = {
  student_id: number;
  author_name: string;
  book_name: string;
  check_out_date: Date;
  check_in_date: Date;
  return_on: Date;
};

export const bookSchemaArray: (keyof BookSchema)[] = [
  'book_id',
  'name',
  'call_number',
  'publisher',
  'created_on',
  'decimal_id',
  'author_id'
];

export type GetBookCallNumberModel = {
  book_id: number;
  book_name: string;
  author_name: string;
  call_number: string;

  books_out_id?: number;
  student_name?: string;
  class?: string;
  teacher_name?: string;
  check_out_date?: Date;
  return_on?: Date;
  check_in_date?: Date;
};

export type BookSchema = {
  book_id?: number;
  author_id: number;
  decimal_id: number;
  call_number: string;
  name: string;
  publisher: string;
  created_on: Date;
};

export type TableBookSchema = {
  author_name: string;
  dewey_decimal_name: string;
} & Omit<BookSchema, 'created_on'>;
