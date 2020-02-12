import {getAll, deleteRow, addOrUpdate} from 'db/utils';

const tableName = `dewey_summary_2`;
const pkFieldName = `dewey_summar_2_id`
export default {
        getAll: async () => await getAll(tableName),
        deleteRow: async () => {
            const func = deleteRow(tableName, pkFieldName);
            return func;
        },
        addOrUpdate
};