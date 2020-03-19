import React from 'react';

import PageBase from 'components/page/PageBase';
import repo from './summary3.repo';
import { getSelectList } from 'pages/deweySystem/summary2/summary2.repo';
import { DefaultColumnModel } from 'components/page/PageBase.type';

const defaultColumns: DefaultColumnModel[] = [
  {
    name: 'dewey_summary_3_id',
    label: 'Id',
    type: 'header',
    value: 'Dewey Summary 3'
  },
  {
    name: 'summary_3_id',
    label: 'Summary 3 Id',
    type: 'text'
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text'
  },
  {
    name: 'summary_2_id',
    options: {
      display: 'false'
    }
  },
  {
    name: 'dewey_summary_2_name',
    ref: 'summary_2_id',
    label: 'Summary 2',
    type: 'select',
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
