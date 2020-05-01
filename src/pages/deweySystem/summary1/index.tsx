import React from 'react';

import PageBase from 'components/page/PageBase';
import { DefaultColumnModel } from 'components/page/PageBase.type';
import serviceBase from './Summary1.service';
import { DeweySummarySchema, TableDeweySummarySchema } from './Summary1.type';

const defaultColumns: DefaultColumnModel<
  TableDeweySummarySchema,
  DeweySummarySchema
>[] = [
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
