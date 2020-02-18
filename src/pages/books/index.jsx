import React from 'react';
import appSettings from 'appSettings';
import PageBase from 'components/page/PageBase';
import repo from './book.repo';

import { getSelectList as getAuthorsSelectList } from 'pages/authors/authors.repo';
import { getSelectList as getDecimalSelectList } from 'pages/deweySystem/decimal/decimal.repo';

const defaultColumns= [
    {
        name:'book_id',
        label: 'Id',
        type: {
            header : 'Book'
        }
    },
    {
        name: 'author_id',
        options: {
            display: 'false'
        },
    },
    {
        name: 'decimal_id',
        options: {
            display: 'false'
        },
    },
    {
        name: 'call_number',
        label: 'Call number',
        type: 'textField'
    },
    {
        name: 'name',
        label: 'Name',
        type: 'textField'
    },
    {
        name:'author_name',
        label: 'Author',
        ref: 'author_id',
        type: 'select',
        dropdownItems: getAuthorsSelectList
    },
    {
        name: 'dewey_decimal_name',
        label: 'Deciaml Name',
        ref: 'decimal_id',
        type: 'select',
        dropdownItems: getDecimalSelectList
    },
    {
        name: 'publisher',
        label: 'Publisher',
        type: 'text'
    },
]

export default () => {
    const handleDeleteRow = repo.deleteRow;
    const handleEditAddRow = repo.addOrUpdate;
    const getAll = repo.getAll;

    return <PageBase {...{defaultColumns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
}