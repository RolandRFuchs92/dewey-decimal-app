import React, { useState, useEffect, useCallback } from 'react';
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import { Fade } from '@material-ui/core';

// import log from 'utils/logger';
import EditDeleteCol, { addButton } from 'utils/tableButtons';
import Modal from './ModalBase';
import { useDialog } from 'utils/dialog';
import { useAlert } from 'utils/snackbarAlerts';
import { JsonObj } from 'types/generic.type';

import { DefaultColumnModel, PageBaseModel } from './PageBase.type';

export default <TTableSchema, TSchema>({
  defaultColumns,
  getAll,
  handleDeleteRow,
  handleEditAddRow,
  modal = null,
  dialogKey,
  primaryKey
}: PageBaseModel<TTableSchema, TSchema>) => {
  const [options, setOptions] = useState({});
  const [columns, setColumns] = useState<
    DefaultColumnModel<TTableSchema, TSchema>[]
  >(defaultColumns);
  const [data, setData] = useState<TTableSchema[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<TSchema | undefined>(undefined);

  const showDialog = useDialog();
  const alert = useAlert();

  const reset = async () => {
    const getAllResult = await getAll();

    if (getAllResult.message && !getAllResult.result)
      //TODO check this for caching
      alert.error(getAllResult.message);

    if (getAllResult.message) alert.success(getAllResult.message);

    setData(getAllResult.result || []);
    setOpenModal(false);
  };

  const handleYesOnDelete = useCallback(
    async (rowData: TTableSchema) => {
      try {
        await handleDeleteRow((rowData as any)[primaryKey]);
        await reset();
        alert.success(`Successfully deleted ${rowData[dialogKey]}`);
      } catch (error) {
        alert.error(`There was an error deleting ${rowData[dialogKey]}!`);
      }
    },
    [alert, dialogKey, handleDeleteRow, reset]
  );

  const objectFromRowData = (rowData: string[]): TTableSchema => {
    return Object.fromEntries(
      columns.map(({ name }, index) => [name, rowData[index] || ''])
    );
  };

  const handleEditAdd = (rowData: string[]) => {
    const objectData = (objectFromRowData(rowData) as unknown) as TSchema;
    rowData && setModalData(objectData);
    setOpenModal(true);
  };

  const handleDelete = (rowData: string[]) => {
    const obj = objectFromRowData(rowData);
    showDialog({
      title: 'Are you sure?',
      description: `Really delete ${obj[dialogKey]}?`,
      handleYes: () => handleYesOnDelete(obj)
    });
  };

  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    setOptions({
      selectableRows: 'none',
      pagination: true,
      // @ts-ignore TODO Comeback here and fix this.
      ...addButton(handleEditAdd)
    });

    const cols: DefaultColumnModel<TTableSchema, TSchema>[] = [
      ...defaultColumns,
      // @ts-ignore TODO Comeback here and fix this.
      ...EditDeleteCol(handleEditAdd, handleDelete)
    ];

    setColumns(cols);

    (async () => {
      await reset();
    })();
  }, []);

  return (
    <>
      <Fade in={true} timeout={800}>
        <div>
          <MUIDataTable
            title=""
            options={options}
            columns={columns as MUIDataTableColumnDef[]}
            // @ts-ignore //Todo look at why this it not happy
            data={data}
          />
          {modal || (
            <Modal<TTableSchema, TSchema>
              dialogKey={dialogKey}
              columns={columns}
              open={openModal}
              handleClose={handleClose}
              handleEditAddRow={handleEditAddRow}
              modalData={modalData!}
              reset={reset}
              primaryKey={primaryKey}
            />
          )}
        </div>
      </Fade>
    </>
  );
};
