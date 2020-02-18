import repoBase from 'components/page/repo.base';
import {all} from 'db/repo';
import appSettings from 'appSettings';

const repo = repoBase(`dewey_decimal`);

const getAllQuery = `
SELECT 
	dc.dewey_decimal_id,
	dc.summary_3_id,
	dc.decimal_id,
	dc.name,
	ds3.name as dewey_summary_3_name
FROM
	dewey_decimal dc
JOIN
	dewey_summary_3 ds3
	ON dc.summary_3_id = ds3.summary_3_id
`;
repo.getAll = async () => {
    return await all(getAllQuery);
};

export default repo;

const {tables: {dewey_decimal}} = appSettings;

const getSelectQuery = `
    SELECT
        decimal_id as value,
        summary_3_id || '-' || decimal_id || ': ' ||name as text
    FROM
        ${dewey_decimal.name}
`

export const getSelectList = async () => {
    const result =  await all(getSelectQuery);
    return result;
}