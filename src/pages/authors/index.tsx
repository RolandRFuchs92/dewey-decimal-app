import React from 'react';

import { DefaultColumnModel } from 'components/page/PageBase.type';
import PageBase from 'components/page/PageBase';

import repo from './authors.repo';

const defaultColumns: DefaultColumnModel[] = [
  {
    name: 'author_id',
    label: 'Id',
    type: 'header'
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
    <PageBase
      defaultColumns={defaultColumns}
      getAll={getAll}
      handleDeleteRow={handleDeleteRow}
      handleEditAddRow={handleEditAddRow}
    ></PageBase>
  );
};
