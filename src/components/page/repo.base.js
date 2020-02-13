import {getAll, deleteRow, addOrUpdate} from 'db/utils';
import appSettings from 'appSettings';

export default (tableReference) => {
    const tableName = appSettings.tables[tableReference].name;
    const pkFieldName = appSettings.tables[tableReference].pk;
    
    const deleteFunc = async(obj) => {
        const executeDelete = await deleteRow(tableName, pkFieldName);
        return await executeDelete(obj[pkFieldName])
    };

    return{
        getAll: async () => await getAll(tableName),
        deleteRow: deleteFunc,
        addOrUpdate: async val => await addOrUpdate(val, tableName, pkFieldName) 
    };
};