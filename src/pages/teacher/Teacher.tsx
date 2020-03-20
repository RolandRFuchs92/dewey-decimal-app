import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Fade } from '@material-ui/core';

import AddUpdate from 'utils/tableButtons';
import { getTeachers, hideTeacher } from './Teacher.repo';
import TeacherModal from './Teacher.modal';
import { useAddButton } from 'utils/tableButtons';
import { useAlert } from 'utils/snackbarAlerts';
import { useDialog } from 'utils/dialog';
import appSettings from 'appSettings.json';
import { TeacherModel } from './Teacher.type';
import { DefaultColumnModel } from 'components/page/PageBase.type';

const columnConfig: DefaultColumnModel[] = [
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

export default () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState<TeacherModel[]>([]);
  const [options, setOptions] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [teacher, setTeacher] = useState({});
  const alert = useAlert();
  const dialog = useDialog();
  let columnsVar: DefaultColumnModel[];

  const handleEditAdd = rowData => {
    const obj = Object.fromEntries(
      columnsVar.map(({ name }, index) => [name, rowData[index]])
    );
    setTeacher(obj);
    setIsOpen(true);
  };

  const tableAddButton = useAddButton(handleEditAdd);

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

  const handleDelete = rowData => {
    const teacher = Object.fromEntries(
      columnsVar.map(({ name }, index) => [name, rowData[index]])
    );
    dialog({
      title: 'Are you sure?',
      description: `Really delete ${teacher.first_name} ${teacher.last_name}?`,
      handleYes: () => handleYesForDelete(teacher)
    });
  };

  const handleYesForDelete = async (teacher: TeacherModel) => {
    const teacherName = `${teacher.first_name} ${teacher.last_name}`;
    try {
      await hideTeacher(teacher.teacher_id);
      await reset();
      alert.success(`Successfully removed teacher - ${teacherName}`);
    } catch (error) {
      alert.error(`There was an error removing teacher - ${teacherName}`);
    }
  };

  const handleClose = () => setIsOpen(false);

  const reset = async () => {
    const result = await getTeachers();
    setData(result);
    setIsOpen(false);
  };

  return (
    <>
      <Fade in={true} timeout={appSettings.fadeTransitionDuration}>
        <div>
          <MUIDataTable
            title=""
            data={data}
            columns={columns}
            options={options}
          />
          <TeacherModal
            {...{ isOpen, handleClose, reset, teacher }}
          ></TeacherModal>
        </div>
      </Fade>
    </>
  );
};
