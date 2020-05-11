import React from 'react';

import PageBase from 'components/page/PageBase';
import { getSelectList } from 'pages/deweySystem/summary1/Summary1.service'; // TODO REPLACE WITH SERVICE
import { DefaultColumnModel } from 'components/page/PageBase.type';

import serviceBase from './Summary2.service';
import { TableDeweySummary2Schema, DeweySummary2Schema } from './Summary2.type';

const defaultColumns: DefaultColumnModel<
  TableDeweySummary2Schema,
  DeweySummary2Schema
>[] = [
  {
    name: 'dewey_summary_2_id',
    label: 'Id',
    type: 'header',
    modalTitle: 'Dewey Summary 2'
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
  const handleDeleteRow = serviceBase.deleteFunc;
  const handleEditAddRow = serviceBase.addOrUpdate;
  const getAll = serviceBase.getAll;

  return (
    <PageBase<TableDeweySummary2Schema, DeweySummary2Schema>
      defaultColumns={defaultColumns}
      getAll={getAll}
      handleDeleteRow={handleDeleteRow}
      handleEditAddRow={handleEditAddRow}
      dialogKey="name"
      primaryKey="dewey_summary_2_id"
    />
  );
};
