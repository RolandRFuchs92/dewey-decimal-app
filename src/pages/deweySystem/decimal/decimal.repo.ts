import repoBase from 'components/page/repo.base';
import { all } from 'db/repo';
import { DropdownListModel } from 'types/Generic';

import { getSelectQuery } from './Decimal.sql';
import { getAllQuery } from './Decimal.sql';

const repo = repoBase(`dewey_decimal`);

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export const getSelectList = async () => {
  const result = (await all(getSelectQuery)) as DropdownListModel[];
  return result;
};
