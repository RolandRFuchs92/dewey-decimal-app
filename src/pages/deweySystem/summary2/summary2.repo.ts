import baseRepo from 'components/page/repo.base';
import { all } from 'db/repo';
import { getAllQuery } from 'pages/student/Student.sql';
import { getSelectListQuery } from 'pages/class/Class.sql';
import { DropdownListModel } from 'types/Generic';
import { DeweySummary2Model } from './Summary.type';

const repo = baseRepo<DeweySummary2Model>(`dewey_summary_2`);

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export const getSelectList = async () => {
  return await all<DropdownListModel>(getSelectListQuery);
};
