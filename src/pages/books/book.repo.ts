import repoBase from 'components/page/repo.base';
import { all, single } from 'db/repo';
import { getAllQuery } from './Book.sql';
import {
  getBooksSelectListQuery,
  getStudentBooksHistoryQuery,
  getBookByCallNumberQuery
} from './Book.sql';
import { DropdownListModel } from 'types/generic.type';
import {
  BookModel,
  GetStudentBooksHistoryModel,
  GetBookCallNumberModel
} from './Book.type';

const repo = repoBase<BookModel>(`book`, 'book_id');

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export const getBooksSelectList = async () => {
  const data = await all<DropdownListModel>(getBooksSelectListQuery);
  return data;
};

export const getStudentBooksHistory = async (student_id: string) => {
  const data = await all<GetStudentBooksHistoryModel>(
    getStudentBooksHistoryQuery,
    {
      $student_id: student_id
    }
  );
  return data;
};

export const getBookByCallNumber = async (
  call_number: string
): Promise<GetBookCallNumberModel> => {
  const result = await single<GetBookCallNumberModel>(
    getBookByCallNumberQuery,
    {
      $call_number: call_number
    }
  );

  return result!;
};
