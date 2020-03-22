import repoBase from 'components/page/repo.base';
import { all } from 'db/repo';
import appSettings from 'appSettings.json';

import { CalculateCheckoutModel, CalculateCheckinModel } from './Home.type';

const {
  tables: { book, author, dewey_decimal }
} = appSettings;

const repo = repoBase(`book`);

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export const getBooksSelectList = async () => {
  const data = await all(getBooksSelectListQuery);
  return data.map(({ [appSettings.tables.book.pk]: pk, name, call_number }) => {
    return {
      value: pk,
      text: `${name.substr(0, 20)} - ${call_number}`
    };
  });
};

export const getStudentBooksHistory = async (student_id: string) => {
  const data = await all(getStudentBooksHistoryQuery, {
    $student_id: student_id
  });
  return data;
};

export const getBookByCallNumber = async (
  call_number: string
): Promise<CalculateCheckoutModel | CalculateCheckinModel> => {
  const [data] = await all(getBookByCallNumberQuery, {
    $call_number: call_number
  });
  return data;
};
