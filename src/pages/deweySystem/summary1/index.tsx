import React from 'react';

import PageBase from 'components/page/PageBase';
import repo from './Summary1.repo';
import { DefaultColumnModel } from 'components/page/PageBase.type';

const defaultColumns: DefaultColumnModel[] = [
  {
    label: 'Id',
    name: 'dewey_summary_id',
    type: 'header',
    modalTitle: 'Dewey summary 1'
  },
  {
    label: 'Name',
    name: 'name',
    type: 'text'
  },
  {
    label: 'Summary Id',
    name: 'summary_id',
    type: 'text'
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
      dialogKey="name"
    />
  );
};
