import React from 'react';

import PageBase from 'components/page/PageBase';
import repo, { getBooksForSelect, getStudentsForSelect } from './booksout.repo';

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
        options: {
            display: 'false'
        },
    },
    {
        name: `book_name`,
        label: `Book`,
        ref: `book_id`,
        type: 'select',
        dropdownItems: getBooksForSelect
    },
    {
        name: 'student_id',
        options: {
            display: 'false'
        }        
    },
    {
        name: 'student_name',
        type: 'select',
        ref: 'student_id',
        dropdownItems: getStudentsForSelect
    },
    {
        name: 'check_out_date',
        label: 'Checked out on',
        type: 'date'
    },
    {
        name: 'check_in_date',
        label: 'Checked in on',
        type: 'date',
    },
]

export default () => {
    const handleDeleteRow = repo.deleteRow;
    const handleEditAddRow = repo.addOrUpdate;
    const getAll = repo.getAll;

    return <PageBase {...{defaultColumns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
}