import React, { useState, useEffect, useCallback } from 'react';
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import { Fade } from '@material-ui/core';

import log from 'utils/logger';
import EditDeleteCol, { useAddButton } from 'utils/tableButtons';
import Modal from './ModalBase';
import { useDialog } from 'utils/dialog';
import { useAlert } from 'utils/snackbarAlerts';
import { JsonObj, HasName } from 'types/Generic';

import { DefaultColumnModel, PageBaseModel } from './PageBase.type';

export default <T,>({
  defaultColumns,
  getAll,
  handleDeleteRow,
  handleEditAddRow,
  modal = null
}: PageBaseModel<T>) => {
  const [options, setOptions] = useState({});
  const [columns, setColumns] = useState<DefaultColumnModel[]>(defaultColumns);
  const [data, setData] = useState<T[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const showDialog = useDialog();
  const alert = useAlert();

  const reset = useCallback(async () => {
    setData(await getAll());
    setOpenModal(false);
  }, [getAll]);

  const handleYesOnDelete = useCallback(
    async (rowData: HasName<T>) => {
      try {
        await handleDeleteRow(rowData);
        await reset();
        alert.success(`Successfully deleted ${rowData.name}`);
      } catch (error) {
        alert.error(`There was an error deleting ${rowData.name}!`);
        log.error(error);
      }
    },
    [alert, handleDeleteRow, reset]
  );

  const objectFromRowData = useCallback(
    (rowData: JsonObj) =>
      Object.fromEntries(
        columns.map(({ name }, index) => [name, rowData[index] || ''])
      ),
    [columns]
  );

  const handleEditAdd = useCallback(
    (rowData: JsonObj) => {
      let obj = null;
      rowData && (obj = objectFromRowData(rowData));
      setModalData(obj);
      setOpenModal(true);
    },
    [objectFromRowData]
  );

  const handleDelete = useCallback(
    (rowData: JsonObj) => {
      const obj = objectFromRowData(rowData);
      showDialog({
        title: 'Are you sure?',
        description: `Really delete ${obj.name}?`,
        handleYes: () => handleYesOnDelete(obj)
      });
    },
    [handleYesOnDelete, objectFromRowData, showDialog]
  );

  const handleClose = () => setOpenModal(false);
  const addButton = useAddButton(handleEditAdd);

  useEffect(() => {
    setOptions({
      selectableRows: 'none',
      pagination: true,
      ...addButton
    });

    const cols: DefaultColumnModel[] = [
      ...defaultColumns,
      ...EditDeleteCol(handleEditAdd, handleDelete)
    ];

    setColumns(cols);

    (async () => {
      await reset();
    })();
  }, [reset]);

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
            <Modal
              columns={columns}
              open={openModal}
              handleClose={handleClose}
              handleEditAddRow={handleEditAddRow}
              modalData={modalData}
              reset={reset}
            ></Modal>
          )}
        </div>
      </Fade>
    </>
  );
};
