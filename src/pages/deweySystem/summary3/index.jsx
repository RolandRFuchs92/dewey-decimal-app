import React from 'react';

import PageBase from 'components/page/PageBase';
import repo from './summary3.repo';
import { getSelectList } from 'pages/deweySystem/summary2/summary2.repo';

const defaultColumns= [
    {
        name:'dewey_summary_3_id',
        label: 'Id',
        type: {
            header : 'Dewey Summary 3'
        }
    },
    {
        name: 'summary_3_id',
        label: 'Summary 3 Id',
        type: 'textfield'
    },
    {
        name: 'name',
        label: 'Name',
        type: 'textField'
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
        type:'select',
        dropdownItems: getSelectList
   }
]

export default () => {
    const handleDeleteRow = repo.deleteRow;
    const handleEditAddRow = repo.addOrUpdate;
    const getAll = repo.getAll;

    return <PageBase {...{defaultColumns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
}