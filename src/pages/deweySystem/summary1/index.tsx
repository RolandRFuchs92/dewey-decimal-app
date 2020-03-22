import React, { useState, useEffect, useCallback } from 'react';
import MUIDataTable from 'mui-datatables';
import { Fade } from '@material-ui/core';

import EditDeleteCol, { useAddButton } from 'utils/tableButtons';
import { getAll, deleteRow } from './summary1.repo';
import { useDialog } from 'utils/dialog';
import { useAlert } from 'utils/snackbarAlerts';
import Modal from './Summary1.modal';

import appSettings from 'appSettings.json';
import { JsonObj } from 'types/Generic';

const defaultColumns = [
  {
    label: 'Id',
    name: 'dewey_summary_id'
  },
  {
    label: 'Name',
    name: 'name'
  },
  {
    label: 'Summary Id',
    name: 'summary_id'
  }
];

export default () => {
  const [options, setOptions] = useState({});
  const [columns, setColumns] = useState(defaultColumns);
  const [data, setData] = useState<JsonObj[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<JsonObj>({});

  const showDialog = useDialog();
  const alert = useAlert();

  const objectFromRowData = useCallback(
    rowData =>
      Object.fromEntries(
        columns.map(({ name }, index) => [name, rowData[index]])
      ),
    [columns]
  );

  const handleEditAdd = useCallback(
    rowData => {
      let obj = null;
      rowData && (obj = objectFromRowData(rowData));
      setModalData(obj!);
      setOpenModal(true);
    },
    [objectFromRowData]
  );

  const handleYesOnDelete = useCallback(
    async (rowData: JsonObj) => {
      try {
        await deleteRow(+rowData.dewey_summary_id);
        await reset();
        alert.success(`Successfully deleted ${rowData.name}`);
      } catch {
        alert.error(`There was an error deleting ${rowData.name}!`);
      }
    },
    [alert]
  );

  const handleDelete = useCallback(
    rowData => {
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
  // @ts-ignore
  const addButton = useAddButton(handleEditAdd);
  const reset = async () => {
    setData(await getAll());
    setOpenModal(false);
  };

  useEffect(() => {
    setOptions({
      selectableRows: 'none',
      ...addButton
    });

    // @ts-ignore // TODO checkup on this...
    setColumns([
      ...defaultColumns,
      ...EditDeleteCol(handleEditAdd, handleDelete)
    ]);

    (async () => {
      await reset();
    })();
  }, [addButton, handleDelete, handleEditAdd]);

  return (
    <>
      <Fade in={true} timeout={appSettings.fadeTransitionDuration}>
        <div>
          <MUIDataTable
            title=""
            options={options}
            columns={columns}
            data={data}
          />
          <Modal
            open={openModal}
            modalData={modalData}
            handleClose={handleClose}
            reset={reset}
          />
        </div>
      </Fade>
    </>
  );
};
