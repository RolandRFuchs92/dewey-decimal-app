import React from 'react';

import PageBase from 'components/page/PageBase';
import repo, { getSelectList } from 'pages/deweySystem/summary2/Summary2.repo';
import { DefaultColumnModel } from 'components/page/PageBase.type';
import { TableDeweySummary3Schema, DeweySummary3Schema } from './Summary3.type';
import serviceBase from './Summary3.service';

const defaultColumns: DefaultColumnModel<
  TableDeweySummary3Schema,
  DeweySummary3Schema
>[] = [
  {
    name: 'dewey_summary_3_id',
    label: 'Id',
    modalTitle: 'Dewey Summary 3',
    type: 'header'
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
  const handleDeleteRow = serviceBase.deleteFunc;
  const handleEditAddRow = serviceBase.addOrUpdate;
  const getAll = serviceBase.getAll;

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
