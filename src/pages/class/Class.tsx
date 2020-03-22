import React, { useEffect, useState } from 'react';
import { Grid, Fade } from '@material-ui/core';
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
  MUIDataTableProps
} from 'mui-datatables';

import { getClasses, hideClass } from './Class.repo';
import Modal from './Class.Modal';
import { useAlert } from 'utils/snackbarAlerts';

import { useDialog } from 'utils/dialog';
import EditDeleteCol, { useAddButton } from 'utils/tableButtons';
import appSettings from 'appSettings.json';
import { JsonObj } from 'types/Generic';
import { DatatabelDataModel } from 'components/page/PageBase.type';
import { ClassModel } from './Class.type';

const columns = [
  {
    name: 'class_id',
    label: 'Id'
  },
  {
    name: 'class_name',
    label: 'Name'
  },
  {
    name: 'grade',
    label: 'Grade'
  },
  {
    name: 'is_active',
    label: 'Active'
  }
];

export default () => {
  const [data, setData] = useState<MUIDataTableColumn[]>([]);
  const [modalData, setModalData] = useState<
    DatatabelDataModel<ClassModel> | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const alert = useAlert();
  const dialog = useDialog();

  const handleDelete = (rowData: JsonObj) => {
    const obj = Object.fromEntries(
      getColumns().map(({ name }, index) => [name, rowData[index]])
    );
    dialog({
      title: 'Are you sure?',
      description: `Really delete grade ${obj.grade} - ${obj.class_name}?`,
      handleYes: () => handleYesForDelete(obj.class_id)
    });
  };
  const handleEditAdd = (rowData: JsonObj) => {
    const obj = Object.fromEntries(
      getColumns().map(({ name }, index) => [name, rowData[index]])
    );
    setModalData(obj);
    setIsOpen(true);
  };

  const addButton = useAddButton(handleEditAdd);
  // @ts-ignore //TODO get this to compile after tsignore is gone
  const tableOptions: MUIDataTableOptions = {
    selectableRows: 'none',
    ...addButton
  };

  const getColumns = () => {
    return [...columns, ...EditDeleteCol(handleEditAdd, handleDelete)];
  };

  const handleYesForDelete = async (classIdToDelete: string) => {
    try {
      await hideClass(+classIdToDelete);
      await resetPage();
      alert.success(`Successfully removed class[${classIdToDelete}]`);
    } catch (e) {
      alert.error(`Error removing class[${classIdToDelete}]`);
    }
  };

  const resetPage = async () => {
    setData(((await getClasses()) as unknown[]) as MUIDataTableColumn[]);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      await resetPage();
    })();
  }, []);

  useEffect(() => {}, [data]);

  return (
    <Grid container direction="column" spacing={2}>
      <Fade in={true} timeout={appSettings.fadeTransitionDuration}>
        <div>
          <MUIDataTable
            title=""
            options={tableOptions}
            columns={(getColumns() as unknown) as MUIDataTableProps['columns']}
            data={data}
          />
          <Grid item>
            <Modal
              isOpen={isOpen}
              handleClose={handleClose}
              modalData={modalData!}
              updateTable={() => resetPage()}
            />
          </Grid>
        </div>
      </Fade>
    </Grid>
  );
};
