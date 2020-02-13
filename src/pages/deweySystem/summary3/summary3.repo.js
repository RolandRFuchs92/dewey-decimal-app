import {getAll, deleteRow, addOrUpdate} from 'db/utils';

const tableName = `dewey_summary_3`;
const pkFieldName = `dewey_summar_3_id`
export default {
        getAll: async () => await getAll(tableName),
        deleteRow: async () => {
            const func = deleteRow(tableName, pkFieldName);
            return func;
        },
        addOrUpdate
};