import React from 'react';

import { DefaultColumnModel } from 'components/page/PageBase.type';
import PageBase from 'components/page/PageBase';
import serviceBase from 'components/page/service.base';
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
  const genericService = serviceBase<AuthorSchema, AuthorSchema>('author');
  const handleDeleteRow = genericService.deleteFunc;
  const handleEditAddRow = genericService.addOrUpdate;
  const getAll = genericService.getAll;

  return (
    <PageBase<AuthorSchema, AuthorSchema>
      defaultColumns={defaultColumns}
      getAll={getAll}
      handleDeleteRow={handleDeleteRow}
      handleEditAddRow={handleEditAddRow}
      dialogKey="name"
    />
  );
};
