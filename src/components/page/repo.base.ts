import { getAll, deleteRow, addOrUpdate } from 'db/utils';
import { TableNames } from 'appSettings.type';
import appSettings from 'appSettings.json';
import { JsonObj } from 'types/Generic';

export default (tableReference: TableNames) => {
  const { tables } = appSettings;

  const tableName = tables[tableReference].name;
  const pkFieldName = tables[tableReference].pk;

  const deleteFunc = async (obj: { [key: string]: string }) => {
    const executeDelete = deleteRow(tableName, pkFieldName);
    return await executeDelete(obj[pkFieldName]);
  };

  return {
    getAll: async () => await getAll(tableName),
    deleteRow: deleteFunc,
    addOrUpdate: async (val: JsonObj | null) =>
      await addOrUpdate(val!, tableName, pkFieldName)
  };
};
