import repoBase from 'components/page/repo.base';
import { all } from 'db/repo';
import { getAllQuery } from 'pages/student/Student.sql';
import {
  getBooksSelectListQuery,
  getStudentBooksHistoryQuery,
  getBookByCallNumberQuery
} from './Book.sql';
import { DropdownListModel } from 'types/Generic';
import {
  BookModel,
  GetStudentBooksHistoryModel,
  GetBookCallNumberModel
} from './Book.type';

const repo = repoBase<BookModel>(`book`);

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
): Promise<GetBookCallNumberModel[]> => {
  const result = await all<GetBookCallNumberModel>(getBookByCallNumberQuery, {
    $call_number: call_number
  });

  return result;
};