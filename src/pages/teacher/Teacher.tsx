import React from 'react';

import PageBase from 'components/page/PageBase';
import { DefaultColumnModel } from 'components/page/PageBase.type';

import serviceBase from './Teacher.service';
import { TableTeacherSchema, TeacherSchema } from './Teacher.type';

const defaultColumns: DefaultColumnModel<
  TableTeacherSchema,
  TeacherSchema
>[] = [
  {
    label: 'Id',
    name: 'teacher_id',
    type: 'header',
    modalTitle: 'Class'
  },
  {
    label: 'Name',
    name: 'first_name',
    type: 'text'
  },
  {
    label: 'Surname',
    name: 'last_name',
    type: 'text'
  },
  {
    label: 'Mobile',
    name: 'mobile',
    type: 'text'
  },
  {
    label: 'Email ',
    name: 'email',
    type: 'text'
  },
  {
    label: 'Class',
    name: 'class_id',
    type: 'text' // TODO Make this a dropdown list
  },
  {
    label: 'Active',
    name: 'is_active',
    type: 'check'
  }
];

export default () => {
  const handleDeleteRow = serviceBase.deleteFunc;
  const handleEditAddRow = serviceBase.addOrUpdate;
  const getAll = serviceBase.getAll;

  return (
    <PageBase
      defaultColumns={defaultColumns}
      getAll={getAll}
      handleDeleteRow={handleDeleteRow}
      handleEditAddRow={handleEditAddRow}
      dialogKey="first_name"
      primaryKey="teacher_id"
    />
  );
};
