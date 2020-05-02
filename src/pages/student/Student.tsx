import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import PageBase from 'components/page/PageBase';
import { tableButton } from 'utils/tableButtons';
import { DefaultColumnModel } from 'components/page/PageBase.type';
import { getDropdownList } from 'pages/class/Class.service';

import serviceBase from './Student.service';
import StudentProfile from './StudentProfile';
import {
  StudentModel,
  TableStudentSchema,
  StudentSchema
} from './Student.type';

const defaultColumns: DefaultColumnModel<
  TableStudentSchema,
  StudentSchema
>[] = [
  // TODO add a tableSchemaModel...
  {
    name: 'student_id',
    label: 'Id',
    type: 'header',
    modalTitle: 'Student'
  },
  {
    name: 'first_name',
    label: 'Name',
    type: 'text'
  },
  {
    name: 'last_name',
    label: 'Surname',
    type: 'text'
  },
  {
    name: 'birthdate',
    label: 'Birthday',
    type: 'date'
  },
  {
    name: 'mother_name',
    label: 'Mom',
    type: 'text'
  },
  {
    name: 'mother_mobile',
    label: 'Mom No.',
    type: 'text'
  },
  {
    name: 'mother_email',
    label: 'Mom email',
    type: 'text'
  },
  {
    name: 'father_name',
    label: 'Dad',
    type: 'text'
  },
  {
    name: 'father_mobile',
    label: 'Dad No.',
    type: 'text'
  },
  {
    name: 'father_email',
    label: 'Dad email',
    type: 'text'
  },
  {
    name: 'class_id',
    options: {
      display: false
    }
  },
  {
    name: 'class_name',
    label: 'Class',
    ref: 'class_id',
    type: 'select',
    getDropDownItems: getDropdownList
  },
  {
    name: 'is_active',
    label: 'Active',
    type: 'check'
  }
];

const useStyles = makeStyles(theme => {
  return {
    studentProfile: {
      fontSize: 20,
      color: 'purple',
      cursor: 'pointer'
    }
  };
});

export default () => {
  const classes = useStyles();

  const [studentId, setStudentId] = useState(1);
  const [open, setOpen] = useState(false);
  const handleDeleteRow = serviceBase.deleteFunc;
  const handleEditAddRow = serviceBase.addOrUpdate;
  const getAll = serviceBase.getAll;

  const columns = defaultColumns.concat(
    // @ts-ignore TODO make an exception for columns like this
    tableButton(
      'Profile',
      props => {
        setStudentId(+props[0]);
        setOpen(true);
      },
      classes.studentProfile,
      'Student'
    )
  );

  return (
    <>
      <PageBase<TableStudentSchema, StudentSchema>
        defaultColumns={columns}
        getAll={getAll}
        handleDeleteRow={handleDeleteRow}
        handleEditAddRow={handleEditAddRow}
        dialogKey="first_name"
      />
      <StudentProfile
        studentId={studentId}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};
