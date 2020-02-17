import {startCase, isEmpty} from 'lodash';

import repoBase from 'components/page/repo.base';
import appSettings from 'appSettings';
import { all } from 'db/repo';

export default repoBase(`author`);


const querySelectList =  `
    SELECT
        ${appSettings.tables.author.pk},
        name,
        second_name,
        surname
    FROM
        ${appSettings.tables.author.name}
`;

export const getSelectList = async () => {
    const selectData = await all(querySelectList);
    return selectData.map(({pk, name, second_name, surname}) => {
        return {
            text: `${startCase(name)} ${!isEmpty(second_name) && `${second_name.substr(0,1)}.`} ${startCase(surname)}`,
            value: pk
        };
    });
}
