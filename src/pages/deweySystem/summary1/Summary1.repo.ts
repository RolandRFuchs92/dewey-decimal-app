import baseRepo from 'components/page/repo.base';
import { all } from 'db/repo';
import { DropdownListModel } from 'types/generic.type';

import { DeweySummarySchema, TableDeweySummarySchema } from './Summary1.type';
import { getAllQuery, getSelectListQuery } from './Summary1.sql';

const repo = baseRepo<DeweySummarySchema, TableDeweySummarySchema>(
  `dewey_summary`,
  'dewey_summary_id'
);

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export const getSelectList = async () => {
  return await all<DropdownListModel>(getSelectListQuery);
};
