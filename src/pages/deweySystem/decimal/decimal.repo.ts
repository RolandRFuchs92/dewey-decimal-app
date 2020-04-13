import repoBase from 'components/page/repo.base';
import { all } from 'db/repo';
import { DropdownListModel } from 'types/generic.type';

import { getSelectQuery } from './Decimal.sql';
import { getAllQuery } from './Decimal.sql';
import { getAllModel } from './Decimal.type';

const repo = repoBase<getAllModel>(`dewey_decimal`, 'decimal_id');

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export const getSelectList = async () => {
  const result = (await all(getSelectQuery)) as DropdownListModel[];
  return result;
};
