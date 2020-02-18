import React from 'react';
import PageBase from 'components/page/PageBase';

import repo from './decimal.repo';
import { getSelectList } from 'pages/deweySystem/summary3/summary3.repo';

const defaultColumns = [
    
    {
        name: 'dewey_decimal_id',
        label: 'Id',
        type: {
            header : 'Dewey Decimal'
        }
    },
    {
        name: 'summary_3_id',
        options: {
            display: 'false'
        }
    },
    {
        name: 'summary',
        ref: 'summary_3_id',
        label: 'Summary',
        type:'select',
        dropdownItems: getSelectList
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
]

export default () => {
    const {getAll, deleteRow:handleDeleteRow, addOrUpdate: handleEditAddRow} = repo;
    return <PageBase {...{defaultColumns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
}