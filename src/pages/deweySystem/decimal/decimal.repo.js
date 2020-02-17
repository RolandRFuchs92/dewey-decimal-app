import repo from 'components/page/repo.base';
import {run} from 'db/repo';
import appSettings from 'appSettings';

export default repo(`dewey_decimal`);

const {tables: {dewey_decimal}} = appSettings;

const getSelectQuery = `
    SELECT
        ${dewey_decimal.pk},
        name
    FROM
        ${dewey_decimal.name}
`

export const getSelectList = async () => {
    const result =  await run(getSelectQuery);
    return result;
}