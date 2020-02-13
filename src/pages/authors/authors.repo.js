import {getAll, deleteRow, addOrUpdate} from 'db/utils';
import appSettings from 'appSettings';

export default (() => {
    const tableName = appSettings.tables.author.name;
    const pkFieldName = appSettings.tables.author.pk;
    
    const curriedAddOrUpdate = async (val) => {
        return await addOrUpdate(val, tableName, pkFieldName);
    }

    return {
        getAll: async () => await getAll(tableName),
        deleteRow: async () => {
            const func = deleteRow(tableName, pkFieldName);
            return func;
        },
        addOrUpdate: curriedAddOrUpdate
    };
}) ();