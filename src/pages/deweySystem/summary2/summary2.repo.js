import {getAll, deleteRow, addOrUpdate} from 'db/utils';
import appSettings from 'appSettings';



export default (() => {
    const tableName = appSettings.tables.dewey_summary_2.name;
    const pkFieldName = appSettings.tables.dewey_summary_2.pk;

    return {
        getAll: async () => await getAll(tableName),
        deleteRow: async () => {
            const func = deleteRow(tableName, pkFieldName);
            return func;
        },
        addOrUpdate: async val => await addOrUpdate(val, tableName, pkFieldName) 
    };
})();