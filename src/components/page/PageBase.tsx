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

export default <T,>({
  defaultColumns,
  getAll,
  handleDeleteRow,
  handleEditAddRow,
  modal = null,
  dialogKey
}: PageBaseModel<T>) => {
  const [options, setOptions] = useState({});
  const [columns, setColumns] = useState<DefaultColumnModel[]>(defaultColumns);
  const [data, setData] = useState<T[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<T | undefined>(undefined);

  const showDialog = useDialog();
  const alert = useAlert();

  const reset = async () => {
    const tableData = await getAll();
    setData(tableData);
    setOpenModal(false);
  };

  const handleYesOnDelete = useCallback(
    async (rowData: T) => {
      try {
        await handleDeleteRow(rowData);
        await reset();
        alert.success(`Successfully deleted ${rowData[dialogKey]}`);
      } catch (error) {
        alert.error(`There was an error deleting ${rowData[dialogKey]}!`);
        // log.error(error);
      }
    },
    [alert, dialogKey, handleDeleteRow, reset]
  );

  const objectFromRowData = (rowData: JsonObj): T =>
    Object.fromEntries(
      columns.map(({ name }, index) => [name, rowData[index] || ''])
    );

  const handleEditAdd = (rowData: JsonObj) => {
    rowData && setModalData(objectFromRowData(rowData));
    setOpenModal(true);
  };

  const handleDelete = (rowData: JsonObj) => {
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
      ...addButton(handleEditAdd)
    });

    const cols: DefaultColumnModel[] = [
      ...defaultColumns,
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
            <Modal
              columns={columns}
              open={openModal}
              handleClose={handleClose}
              handleEditAddRow={handleEditAddRow}
              modalData={modalData!}
              reset={reset}
            />
          )}
        </div>
      </Fade>
    </>
  );
};
