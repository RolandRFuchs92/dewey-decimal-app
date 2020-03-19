import { startCase, isEmpty } from 'lodash';

import repoBase from 'components/page/repo.base';
import appSettings from 'appSettings.json';
import { all } from 'db/repo';
import { AuthorsQuerySelectListModel } from './Authors.type';
import { DropdownListModel } from 'components/page/PageBase.type';

export default repoBase(`author`);

const querySelectList = `
    SELECT
        ${appSettings.tables.author.pk},
        name,
        second_name,
        surname
    FROM
        ${appSettings.tables.author.name}
`;

export const getSelectList = async (): Promise<DropdownListModel[]> => {
  const selectData = await all(querySelectList);
  return selectData.map(row => {
    const pkName = appSettings.tables.author.pk as string;
    const {
      //@ts-ignore
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
