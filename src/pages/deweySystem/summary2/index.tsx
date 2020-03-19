import React from 'react';

import PageBase from 'components/page/PageBase';
import repo from './summary2.repo';
import { getSelectList } from 'pages/deweySystem/summary1/summary1.repo';
import { DefaultColumnModel } from 'components/page/PageBase.type';

const defaultColumns: DefaultColumnModel[] = [
  {
    name: 'dewey_summary_2_id',
    label: 'Id',
    type: 'header',
    value: 'Dewey Summary 2'
  },
  {
    name: 'summary_2_id',
    label: 'Summary 2 Id',
    type: 'textfield'
  },
  {
    name: 'summary_id',
    options: {
      display: 'false'
    }
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text'
  },
  {
    name: 'dewey_summary_name',
    label: 'Summary',
    type: 'select',
    ref: 'summary_id',
    getDropDownItems: getSelectList
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
    />
  );
};
