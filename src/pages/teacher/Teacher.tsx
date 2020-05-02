import React, { useEffect, useState } from 'react';
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import { Fade } from '@material-ui/core';

import AddUpdate from 'utils/tableButtons';
import { addButton } from 'utils/tableButtons';
import { useAlert } from 'utils/snackbarAlerts';
import { useDialog } from 'utils/dialog';
import appSettings from 'appSettings.json';
import {
  DefaultColumnModel,
  DatatabelDataModel
} from 'components/page/PageBase.type';
import { JsonObj } from 'types/generic.type';

import TeacherModal from './Teacher.modal';
import serviceBase from './Teacher.service';
import { TeacherSchema, TableTeacherSchema } from './Teacher.type';

const columnConfig: DefaultColumnModel<TableTeacherSchema, TeacherSchema>[] = [
  {
    name: 'teacher_id',
    label: 'Id'
  },
  {
    name: 'first_name',
    label: 'Name'
  },
  {
    name: 'last_name',
    label: 'Surname'
  },
  {
    name: 'mobile',
    label: 'Mobile'
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'is_active',
    label: 'Active'
  },
  {
    name: 'class_id',
    label: 'Class'
  }
];

const tableOptions = {
  selectableRows: 'none'
};

const teacherDefault: DatatabelDataModel<TeacherSchema> = {
  Delete: null,
  Edit: null,
  class_id: 0,
  email: '',
  first_name: '',
  is_active: false,
  last_name: '',
  mobile: '',
  teacherName: '',
  teacher_id: ''
};

export default () => {
  const [columns, setColumns] = useState<
    DefaultColumnModel<TableTeacherSchema, TeacherSchema>[]
  >([]);
  const [data, setData] = useState<TeacherSchema[]>([]);
  const [options, setOptions] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [teacher, setTeacher] = useState<DatatabelDataModel<TeacherSchema>>(
    teacherDefault
  );
  const alert = useAlert();
  const dialog = useDialog();
  let columnsVar: DefaultColumnModel<TableTeacherSchema, TeacherSchema>[]; //TODO fix this...

  const handleEditAdd = (rowData: JsonObj) => {
    const obj = Object.fromEntries(
      columnsVar.map(({ name }, index) => [name, rowData[index]])
    );
    setTeacher(obj);
    setIsOpen(true);
  };

  const tableAddButton = addButton(handleEditAdd);

  useEffect(() => {
    (async () => {
      let editButtons = await AddUpdate(handleEditAdd, handleDelete);
      setOptions({
        ...tableOptions,
        ...tableAddButton
      });
      const columns = [...columnConfig, ...editButtons];
      columnsVar = columns;
      setColumns(columns);
      reset();
    })();
  }, []);

  // TODO check this logic for indexing
  const handleDelete = (rowData: JsonObj) => {
    const teacher = Object.fromEntries(
      columnsVar.map(({ name }, index) => [name, rowData[index]])
    ) as TeacherSchema;

    dialog({
      title: 'Are you sure?',
      description: `Really delete ${teacher.first_name} ${teacher.last_name}?`,
      handleYes: () => handleYesForDelete(teacher)
    });
  };

  const handleYesForDelete = async (teacher: TeacherSchema) => {
    const teacherName = `${teacher.first_name} ${teacher.last_name}`;
    try {
      // await hideTeacher(+teacher.teacher_id);
      await reset();
      alert.success(`Successfully removed teacher - ${teacherName}`);
    } catch (error) {
      alert.error(`There was an error removing teacher - ${teacherName}`);
    }
  };

  const handleClose = () => setIsOpen(false);

  const reset = async () => {
    // TODO Rework this.
    // const result = await getTeachers();
    // setData(result);
    setIsOpen(false);
  };

  return (
    <>
      <Fade in={true} timeout={appSettings.fadeTransitionDuration}>
        <div>
          <MUIDataTable
            title=""
            data={data}
            columns={(columns as unknown) as MUIDataTableColumnDef[]}
            options={options}
          />
          <TeacherModal
            isOpen={isOpen}
            handleClose={handleClose}
            reset={reset}
            teacher={teacher!}
          />
        </div>
      </Fade>
    </>
  );
};
