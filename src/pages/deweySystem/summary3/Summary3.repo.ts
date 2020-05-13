import baseRepo from 'components/page/repo.base';
import { all } from 'db/repo';
import { DropdownListModel } from 'types/generic.type';

import { selectListQuery, getAllQuery } from './Summary3.sql';
import { TableDeweySummary3Schema, DeweySummary3Schema } from './Summary3.type';

const repo = baseRepo<DeweySummary3Schema, TableDeweySummary3Schema>(
  `dewey_summary_3`,
  'dewey_summary_3_id'
);

repo.getAll = async () => {
  return await all<TableDeweySummary3Schema>(getAllQuery);
};

export default repo;

export const getSelectList = async () => {
  return await all<DropdownListModel>(selectListQuery);
};
