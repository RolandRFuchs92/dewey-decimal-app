import React from 'react';

import PageBase from 'components/page/PageBase';
import { getSelectList } from 'pages/deweySystem/summary3/Summary3.service';
import { DefaultColumnModel } from 'components/page/PageBase.type';

import { TableDeweyDecimalSchema, DeweyDecimalSchema } from './Decimal.type';
import serviceBase from './Decimal.service';

const defaultColumns: DefaultColumnModel<
  TableDeweyDecimalSchema,
  DeweyDecimalSchema
>[] = [
  {
    name: 'dewey_decimal_id',
    label: 'Id',
    type: 'header',
    modalTitle: 'Dewey Decimal'
  },
  {
    name: 'summary_3_id',
    options: {
      display: 'false'
    }
  },

  {
    name: 'decimal_id',
    label: 'Decimal Id',
    type: 'textfield'
  },
  {
    name: 'name',
    label: 'Name',
    type: 'textfield'
  },
  {
    name: 'dewey_summary_3_name',
    ref: 'summary_3_id',
    label: 'Summary',
    type: 'select',
    getDropDownItems: getSelectList
  }
];

export default () => {
  const {
    getAll,
    deleteFunc: handleDeleteRow,
    addOrUpdate: handleEditAddRow
  } = serviceBase;

  return (
    <PageBase<TableDeweyDecimalSchema, DeweyDecimalSchema>
      defaultColumns={defaultColumns}
      getAll={getAll}
      handleDeleteRow={handleDeleteRow}
      handleEditAddRow={handleEditAddRow}
      dialogKey="name"
      primaryKey="dewey_decimal_id"
    />
  );
};
