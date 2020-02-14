import React from 'react';

import PageBase from 'components/page/PageBase';
import repo from './booksout.repo';

const defaultColumns= [
    {
        name:'books_out_id',
        label: 'Id',
        type: {
            header : 'Dewey Summar 3'
        }
    },
    {
        name: 'book_id',
        label: 'Book Id',
        type: 'textfield'
    },
    {
        name: 'student_id',
        label: 'Student',
        type: 'textfield'
    },
    {
        name: 'check_out_date',
        label: 'Checked out on',
        type: 'textfield'
    },
    {
        name: 'check_in_date',
        label: 'Checked in on',
        type: 'textfield'
    },
]

export default () => {
    const handleDeleteRow = repo.deleteRow;
    const handleEditAddRow = repo.addOrUpdate;
    const getAll = repo.getAll;

    return <PageBase {...{defaultColumns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
}