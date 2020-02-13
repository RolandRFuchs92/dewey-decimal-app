import React from 'react';

import PageBase from 'components/page/PageBase';
import repo from './book.repo';

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
        label: 'Author Id',
        type: 'textfield'
    },
    {
        name: 'dewey_decimal_id',
        label: 'Decimal Id',
        type: 'textfield'
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
        name: 'publisher',
        label: 'Publisher',
        type: 'textField'
    },
]

export default () => {
    const handleDeleteRow = repo.deleteRow;
    const handleEditAddRow = repo.addOrUpdate;
    const getAll = repo.getAll;

    return <PageBase {...{defaultColumns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
}