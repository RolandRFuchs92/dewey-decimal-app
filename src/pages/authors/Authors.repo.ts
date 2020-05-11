import { startCase, isEmpty } from 'lodash';

import repoBase from 'components/page/repo.base';
import appSettings from 'appSettings.json';
import { all } from 'db/repo';
import { DropdownListModel } from 'types/generic.type';

import { AuthorsQuerySelectListModel, TableAuthorSchema } from './Authors.type';
import { querySelectList } from './Authors.sql';

export default repoBase<TableAuthorSchema>(`author`, 'author_id');

export const getSelectList = async (): Promise<DropdownListModel[]> => {
  const selectData = await all(querySelectList);
  return selectData.map(row => {
    const pkName = appSettings.tables.author.pk as string;
    const {
      // @ts-ignore
      [pkName]: pk,
      name,
      second_name,
      surname
    }: AuthorsQuerySelectListModel = (row as unknown) as AuthorsQuerySelectListModel;
    return {
      text: `${startCase(name)} ${!isEmpty(second_name) &&
        `${second_name.substr(0, 1)}.`} ${startCase(surname)}`,
      value: `${pk}`
    };
  });
};
