import React from 'react';
import appSettings from 'appSettings';

import PageBase from 'components/page/PageBase';
import repo, { getBooksForSelect, getStudentsForSelect } from './booksout.repo';
const {tables: { books_out, book, student }} = appSettings;


const defaultColumns= [
    {
        name:books_out.pk,
        label: 'Id',
        type: {
            header : 'Dewey Summary 3'
        }
    },
    {
        name: book.pk, 
        options: {
            display: 'false'
        },
    },
    {
        name: 'book_name',
        label: `Book`,
        ref: book.pk,
        type: 'select',
        dropdownItems: getBooksForSelect
    },
    {
        name: student.pk,
        options: {
            display: 'false'
        }        
    },
    {
        name: 'student_name',
        label: 'Student',
        type: 'select',
        ref: student.pk,
        dropdownItems: getStudentsForSelect
    },
    {
        name: 'return_on',
        label: 'Return On',
        type: 'date'
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