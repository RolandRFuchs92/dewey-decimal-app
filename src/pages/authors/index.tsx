import React from 'react';

import { DefaultColumnModel } from 'components/page/PageBase.type';
import PageBase from 'components/page/PageBase';
import serviceBase from 'components/page/service.base';
import { AuthorTableSchema } from './Authors.type';

const defaultColumns: DefaultColumnModel<AuthorTableSchema>[] = [
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
  const genericService = serviceBase<AuthorTableSchema, AuthorTableSchema>(
    'author'
  );
  const handleDeleteRow = genericService.deleteFunc;
  const handleEditAddRow = genericService.addOrUpdate;
  const getAll = genericService.getAll;

  return (
    <PageBase<AuthorTableSchema, AuthorTableSchema>
      defaultColumns={defaultColumns}
      getAll={getAll}
      handleDeleteRow={handleDeleteRow}
      handleEditAddRow={handleEditAddRow}
      dialogKey="name"
    />
  );
};
