import React, { useState } from 'react';

import PageBase from 'components/page/PageBase';
import repo from './Student.repo';
import { getSelectList } from 'pages/class/Class.repo';
import StudentProfile from './StudentProfile';
import { DefaultColumnModel } from 'components/page/PageBase.type';
import { StudentModel } from './Student.type';

const defaultColumns: DefaultColumnModel[] = [
  {
    name: 'student_id',
    label: 'Student',
    type: 'header',
    value: 'Student'
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
    getDropDownItems: getSelectList
  },
  {
    name: 'is_active',
    label: 'Active',
    type: 'check'
  }
];

export default () => {
  const [open, setOpen] = useState(false);
  const handleDeleteRow = repo.deleteRow;
  const handleEditAddRow = repo.addOrUpdate;
  const getAll = repo.getAll;

  // TODO REINTEGRATE THIS
  //   const columns = defaultColumns.concat(
  //     TableButton(() => setOpen(true), 'Profile', Icons.Student)
  //   );

  return (
    <>
      <PageBase<StudentModel>
        defaultColumns={defaultColumns}
        getAll={getAll}
        handleDeleteRow={handleDeleteRow}
        handleEditAddRow={handleEditAddRow}
        dialogKey="first_name"
      />
      <StudentProfile
        open={open}
        handleClose={() => setOpen(false)}
      ></StudentProfile>
    </>
  );
};
