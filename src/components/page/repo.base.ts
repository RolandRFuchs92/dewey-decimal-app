import { getAll, deleteRow, addOrUpdate } from 'db/utils';
import { TableNames } from 'appSettings.type';
import appSettings from 'appSettings.json';
import { JsonObj } from 'types/generic.type';

export default <TSchema, TTableSchema>(
  tableReference: TableNames,
  pk: keyof TSchema
) => {
  const { tables } = appSettings;

  const pkFieldName = tables[tableReference].pk;

  const deleteFunc = async (obj: TSchema) => {
    const executeDelete = deleteRow(tableReference, pk as string);
    const pkValue = (obj[pk] as unknown) as string;
    return await executeDelete(pkValue);
  };

  return {
    getAll: async () => await getAll<TTableSchema>(tableReference),
    deleteRow: deleteFunc,
    addOrUpdate: async (val: TSchema) =>
      await addOrUpdate(val!, tableReference, pkFieldName)
  };
};
