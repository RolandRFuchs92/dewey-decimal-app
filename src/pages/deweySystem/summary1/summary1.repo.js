import { all, run } from 'db/repo';
import { addOrUpdate as addOrUpdateGeneric } from 'db/utils';

const getAllData = `
    SELECT
        dewey_summary_id,
        summary_id,
        name
    FROM 
        dewey_summary
`;

const deleteRowQuery = `
    DELETE
    FROM
        dewey_summary
    WHERE
        dewey_summary_id=$id
`;

const getSelectListQuery = `
    SELECT
        summary_id as value,
        name as text
    FROM
        dewey_summary
`

export const getAll = async () => {
    return await all(getAllData);
}

export const addOrUpdate = async (summary1Object ) => {    
    return await addOrUpdateGeneric(summary1Object, 'dewey_summary')
}
export const deleteRow = async id => {
    return await run(deleteRowQuery, {$id:id});
}

export const getSelectList = async () => {
    return await all(getSelectListQuery);
}
