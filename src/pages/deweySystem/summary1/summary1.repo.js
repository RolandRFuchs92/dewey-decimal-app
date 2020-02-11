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

export const getAll = async () => {
    return await all(getAllData);
}

export const addOrUpdate = async () => {    
    
}
export const deleteRow = async id => {
    return await run(deleteRowQuery, {$id:id});
}