import baseRepo from 'components/page/repo.base';
import {all} from 'db/repo';
const repo = baseRepo(`dewey_summary_3`);


const getAllQuery = `
SELECT
    ds3.dewey_summary_3_id,
    ds3.summary_3_id,
    ds3.summary_2_id,
    ds3.name,
    ds2.name as dewey_summary_2_name
FROM	
    dewey_summary_3 ds3
JOIN	
    dewey_summary_2 ds2
    on ds3.summary_2_id = ds2.summary_2_id
`
repo.getAll = async () => {
    return await all(getAllQuery);
};

export default repo;

const selectListQuery = `
    SELECT
        summary_3_id as value,
        summary_3_id || ': ' || name as text
    FROM
        dewey_summary_3

`;
export const getSelectList = async () => {
    return await all(selectListQuery) as DropdownListModel;
}