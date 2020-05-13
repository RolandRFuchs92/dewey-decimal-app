import baseRepo from 'components/page/repo.base';
import { all } from 'db/repo';
import { DropdownListModel } from 'types/generic.type';

import { DeweySummary2Schema } from './Summary2.type';
import { getAllQuery, getSelectListQuery } from './Summary2.sql';

const repo = baseRepo<DeweySummary2Schema>(
  `dewey_summary_2`,
  'dewey_summary_2_id'
);

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export const getSelectList = async () => {
  return await all<DropdownListModel>(getSelectListQuery);
};
