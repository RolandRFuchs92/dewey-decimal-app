import { getAll, deleteRow, addOrUpdate } from "db/utils";
import { TableNames } from "appSettings.type";
import appSettings from "appSettings.json";

export default (tableReference: TableNames) => {
  const { tables } = appSettings;
  tables;

  const tableName = appSettings.tables[tableReference].name;
  const pkFieldName = appSettings.tables[tableReference].pk;

  const deleteFunc = async (obj: { [key: string]: string }) => {
    const executeDelete = deleteRow(tableName, pkFieldName);
    return await executeDelete(obj[pkFieldName]);
  };

  return {
    getAll: async () => await getAll(tableName),
    deleteRow: deleteFunc,
    addOrUpdate: async (val: { [key: string]: string }) =>
      await addOrUpdate(val, tableName, pkFieldName)
  };
};
