import React from 'react';

import PageBase from 'components/page/PageBase';
import { DefaultColumnModel } from 'components/page/PageBase.type';

import serviceBase from './Class.service';
import { ClassSchema, TableClassSchema } from './Class.type';

const defaultColumns: DefaultColumnModel<TableClassSchema, ClassSchema>[] = [
  {
    label: 'Id',
    name: 'class_id',
    type: 'header',
    modalTitle: 'Class'
  },
  {
    label: 'Name',
    name: 'class_name',
    type: 'text'
  },
  {
    label: 'Grade',
    name: 'grade',
    type: 'text'
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
      dialogKey="class_name"
      primaryKey="class_id"
    />
  );
};
