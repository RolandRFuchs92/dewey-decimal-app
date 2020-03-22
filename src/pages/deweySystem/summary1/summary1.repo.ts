import { all, run } from 'db/repo';
import { addOrUpdate as addOrUpdateGeneric } from 'db/utils';
import { JsonObj, DropdownListModel } from 'types/Generic';
import { DeweySummaryModel } from './Summary1.type';
import { getAllData, deleteRowQuery } from './Summary1.sql';
import { getSelectListQuery } from 'pages/class/Class.sql';

export const getAll = async () => {
  return await all<DeweySummaryModel>(getAllData);
};

export const addOrUpdate = async (summary1Object: JsonObj) => {
  return await addOrUpdateGeneric(summary1Object, 'dewey_summary');
};
export const deleteRow = async (id: number) => {
  return await run(deleteRowQuery, { $id: id });
};

export const getSelectList = async () => {
  return ((await all(getSelectListQuery)) as unknown) as DropdownListModel[];
};
