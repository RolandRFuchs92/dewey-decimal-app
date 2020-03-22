import baseRepo from 'components/page/repo.base';
import { all } from 'db/repo';
import { DropdownListModel } from 'types/Generic';
import { getAllQuery } from 'pages/student/Student.sql';
import { selectListQuery } from './Summary3.sql';
import { DeweySummary3Model } from './Summary3.type';

const repo = baseRepo<DeweySummary3Model>(`dewey_summary_3`);

repo.getAll = async () => {
  return await all<DeweySummary3Model>(getAllQuery);
};

export default repo;

export const getSelectList = async () => {
  return await all<DropdownListModel>(selectListQuery);
};
