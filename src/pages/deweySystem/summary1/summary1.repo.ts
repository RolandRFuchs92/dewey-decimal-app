import baseRepo from 'components/page/repo.base';
import { all } from 'db/repo';
import { getSelectListQuery } from 'pages/class/Class.sql';
import { DropdownListModel } from 'types/Generic';
import { DeweySummaryModel } from './Summary1.type';
import { getAllQuery } from './Summary1.sql';

const repo = baseRepo<DeweySummaryModel>(`dewey_summary`, 'name');

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export const getSelectList = async () => {
  return await all<DropdownListModel>(getSelectListQuery);
};
