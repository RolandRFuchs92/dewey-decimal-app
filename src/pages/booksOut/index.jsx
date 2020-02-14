import React from 'react';

import PageBase from 'components/page/PageBase';
import repo from './booksout.repo';

const defaultColumns= [
    {
        name:'dewey_summary_3_id',
        label: 'Id',
        type: {
            header : 'Dewey Summar 3'
        }
    },
    {
        name: 'summary_3_id',
        label: 'Summary 3 Id',
        type: 'textfield'
    },
  
]

export default () => {
    const handleDeleteRow = repo.deleteRow;
    const handleEditAddRow = repo.addOrUpdate;
    const getAll = repo.getAll;

    return <PageBase {...{defaultColumns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
}