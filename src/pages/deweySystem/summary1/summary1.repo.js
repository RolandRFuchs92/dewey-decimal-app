import { all } from 'db/repo';
import { addOrUpdate } from 'db/utils';

const getAllData = `
    SELECT
        summary_id,
        name
    FROM 
        dewey_summary
`;

export const getAll = async () => {
    return await all(getAllData);
}

export const updateOrDelete = async () => {    
    
}

const add = async(data) => {
    delete data.Edit;
    delete data.Delete;
    return await all();
}

const edit = async (data) => {
    return await all(getAll);
}