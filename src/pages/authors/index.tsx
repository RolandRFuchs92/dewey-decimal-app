import React from 'react';

import { DefaultColumnModel } from 'components/page/PageBase.type';
import PageBase from 'components/page/PageBase';

import repo from './authors.repo';
import { getAllModel } from './Authors.type';

const defaultColumns: DefaultColumnModel[] = [
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
  const handleDeleteRow = repo.deleteRow;
  const handleEditAddRow = repo.addOrUpdate;
  const getAll = repo.getAll;

  return (
    <PageBase<getAllModel>
      defaultColumns={defaultColumns}
      getAll={getAll}
      handleDeleteRow={handleDeleteRow}
      handleEditAddRow={handleEditAddRow}
      dialogKey="name"
    />
  );
};
