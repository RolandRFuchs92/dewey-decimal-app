import repoBase from 'components/page/repo.base';
import { getBooksSelectList } from 'pages/books/book.repo';
import { getSelectList } from 'pages/student/Student.repo';
import { all, run, single } from 'db/repo';
import {
  calculateReturnOnDateForDbInsert,
  formatDateForDbInsert
} from 'utils/businessRules';
import { getAllQuery } from './Booksout.sql';
import {
  checkoutBookQuery,
  checkinBookQuery,
  scannsQuery,
  booksOverdueQuery,
  countBooksCheckedOutTodayQuery,
  countBooksCheckedInTodayQuery
} from './Booksout.sql';
import { GetAllModel, BooksOverdueModel, ScansModel } from './Booksout.type';

const repo = repoBase<GetAllModel>(`books_out`, 'books_out_id');
repo.getAll = async () => {
  const result = await all<GetAllModel>(getAllQuery);
  return result;
};

export const checkout = async (student_id: string, book_id: string) => {
  const statementObject = {
    $student_id: student_id,
    $book_id: book_id,
    $return_on: calculateReturnOnDateForDbInsert(),
    $check_out_date: formatDateForDbInsert()
  };
  await run(checkoutBookQuery, statementObject);
};

export const checkin = async (
  books_out_id: string,
  check_in_date = new Date()
) => {
  const statementObject = {
    $books_out_id: books_out_id,
    $check_in_date: formatDateForDbInsert(check_in_date)
  };
  await run(checkinBookQuery, statementObject);
};

export const getScans = async (date = new Date()) => {
  const statementObject = {
    $date: formatDateForDbInsert(date)
  };
  return await all<ScansModel>(scannsQuery, statementObject);
};

export const getBooksOverdue = async (date = new Date()) => {
  const statementObject = {
    $date: formatDateForDbInsert(date)
  };
  return await all<BooksOverdueModel>(booksOverdueQuery, statementObject);
};

export const countBooksOverdue = async (date = new Date()) => {
  const statementObject = {
    $date: formatDateForDbInsert(date)
  };

  const statement = `SELECT COUNT(*) FROM ${booksOverdueQuery
    .split('FROM')
    .pop()}`;
  return await single(statement, statementObject);
};

export const countBooksCheckedOutToday = async () => {
  const statement = countBooksCheckedOutTodayQuery;
  return await single(statement);
};

export const countBooksCheckedInToday = async () => {
  const statement = countBooksCheckedInTodayQuery;
  return await single(statement);
};

export default repo;
export const getBooksForSelect = getBooksSelectList;
export const getStudentsForSelect = getSelectList;
