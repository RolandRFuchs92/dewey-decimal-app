import React, { useState, useEffect } from 'react';
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import { Fade, Slide } from '@material-ui/core';

import log from 'utils/logger';
import EditDeleteCol, { useAddButton } from 'utils/tableButtons';
import Modal from './ModalBase';
import { useDialog } from 'utils/dialog';
import { useAlert } from 'utils/snackbarAlerts';

import { DefaultColumnModel } from './PageBase.type';

type PageBaseModel = {
  defaultColumns: DefaultColumnModel[];
  getAll: () => Promise<JsonObj[]>;
  handleDeleteRow: (rowData: { [key: string]: string }) => Promise<void>;
  handleEditAddRow: (event: JsonObj | null) => Promise<null | 'add'>;
  modal?: JSX.Element | null;
};

type JsonObj = { [key: string]: string };

export default ({
  defaultColumns,
  getAll,
  handleDeleteRow,
  handleEditAddRow,
  modal = null
}: PageBaseModel) => {
  const [options, setOptions] = useState({});
  const [columns, setColumns] = useState<DefaultColumnModel[]>(defaultColumns);
  const [data, setData] = useState<JsonObj[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const showDialog = useDialog();
  const alert = useAlert();

  const handleEditAdd = useCallback((rowData: JsonObj) => {
    //TODO
    let obj = null;
    rowData && (obj = objectFromRowData(rowData));
    setModalData(obj);
    setOpenModal(true);
  });

  const handleYesOnDelete = async (rowData: JsonObj) => {
    try {
      await handleDeleteRow(rowData);
      await reset();
      alert.success(`Successfully deleted ${rowData.name}`);
    } catch (error) {
      alert.error(`There was an error deleting ${rowData.name}!`);
      log.error(error);
    }
  };

  const objectFromRowData = (rowData: JsonObj) =>
    Object.fromEntries(
      columns.map(({ name }, index) => [name, rowData[index] || ''])
    );
  const handleDelete = (rowData: JsonObj) => {
    const obj = objectFromRowData(rowData);
    showDialog({
      title: 'Are you sure?',
      description: `Really delete ${obj.name}?`,
      handleYes: () => handleYesOnDelete(obj)
    });
  };

  const handleClose = () => setOpenModal(false);
  const addButton = useAddButton(handleEditAdd);
  const reset = useCallback(async () => {
    setData(await getAll());
    setOpenModal(false);
  });

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
  }, [addButton, defaultColumns, handleDelete, handleEditAdd, reset]);

  return (
    <>
      <Fade in={true} timeout={800}>
        <div>
          <MUIDataTable
            title=""
            options={options}
            columns={columns as MUIDataTableColumnDef[]}
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
