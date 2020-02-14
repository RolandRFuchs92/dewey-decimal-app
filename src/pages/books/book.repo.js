import appSettings from 'appSettings';

import repoBase from 'components/page/repo.base';
import {all} from 'db/repo';

export default repoBase(`book`);


const getBooksSelectListQuery = `
    SELECT
        ${appSettings.tables.book.pk},
        name,
        call_number
    FROM
        ${appSettings.tables.book.name}
`;

export const getBooksSelectList = async () => {
    const data = await all(getBooksSelectListQuery);
    return data.map(({pk, name, call_number}) => {
        return {
            value: pk,
            text: `${name.substr(0,20)} - ${call_number}`
        };
    });
}
