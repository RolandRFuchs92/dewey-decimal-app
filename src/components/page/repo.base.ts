import { getAll, deleteRow, addOrUpdate } from 'db/utils';
import { TableNames } from 'appSettings.type';
import appSettings from 'appSettings.json';
import { JsonObj } from 'types/Generic';

export default <T>(tableReference: TableNames, pk: keyof T) => {
  const { tables } = appSettings;

  const pkFieldName = tables[tableReference].pk;

  const deleteFunc = async (obj: T) => {
    const executeDelete = deleteRow(tableReference, pk as string);
    const pkValue = (obj[pk] as unknown) as string;
    return await executeDelete(pkValue);
  };

  return {
    getAll: async () => await getAll<T>(tableReference),
    deleteRow: deleteFunc,
    addOrUpdate: async (val: JsonObj | null) =>
      await addOrUpdate(val!, tableReference, pkFieldName)
  };
};
