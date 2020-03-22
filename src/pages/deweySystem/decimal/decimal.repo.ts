import repoBase from 'components/page/repo.base';
import { all } from 'db/repo';
import { getAllQuery } from 'pages/student/Student.sql';
import { getSelectQuery } from './Decimal.sql';
import { DropdownListModel } from 'types/Generic';

const repo = repoBase(`dewey_decimal`);

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export const getSelectList = async () => {
  const result = (await all(getSelectQuery)) as DropdownListModel[];
  return result;
};
