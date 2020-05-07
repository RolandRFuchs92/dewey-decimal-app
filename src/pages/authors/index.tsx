import React from 'react';

import { DefaultColumnModel } from 'components/page/PageBase.type';
import PageBase from 'components/page/PageBase';

import serviceBase from './Authors.service';
import { AuthorSchema, TableAuthorSchema } from './Authors.type';

const defaultColumns: DefaultColumnModel<TableAuthorSchema, AuthorSchema>[] = [
  {
    name: 'author_id',
    label: 'Id',
    type: 'header',
    modalTitle: 'Author'
  },
  {
    name: 'name',
    label: 'First name',
    type: 'textfield'
  },
  {
    name: 'second_name',
    label: 'Second name',
    type: 'textfield'
  },
  {
    name: 'surname',
    label: 'Last name',
    type: 'textfield'
  }
];

export default () => {
  const handleDeleteRow = serviceBase.deleteFunc;
  const handleEditAddRow = serviceBase.addOrUpdate;
  const getAll = serviceBase.getAll;

  return (
    <PageBase<AuthorSchema, AuthorSchema>
      defaultColumns={defaultColumns}
      getAll={getAll}
      handleDeleteRow={handleDeleteRow}
      handleEditAddRow={handleEditAddRow}
      dialogKey="name"
      primaryKey="author_id"
    />
  );
};
