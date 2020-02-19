import React from 'react';

import PageBase from 'components/page/PageBase';
import repo from './Student.repo';
import { getSelectList } from 'pages/class/Class.repo';

const defaultColumns= [
    {
        name:'student_id',
        label: 'Id',
        type: {
            header : 'Student'
        }
    },
    {
        name: 'first_name',
        label: 'Name',
        type: 'textfield'
    },
    {
        name: 'last_name',
        label: 'Surname',
        type: 'textField'
    },
    {
        name: 'birthdate',
        label:'Birthday',
        type: 'date'
    },
    {
        name: 'mother_name',
        label:'Mom',
        type: 'text'
    },
    {
        name: 'mother_mobile',
        label:'Mom No.',
        type: 'text'
    },
    {
        name: 'mother_email',
        label:'Mom email',
        type: 'text'
    },
    {
        name: 'father_name',
        label:'Dad',
        type: 'text'
    },
    {
        name: 'father_mobile',
        label:'Dad No.',
        type: 'text'
    },
    {
        name: 'father_email',
        label:'Dad email',
        type: 'text'
    },
    {
        name: 'class_id',
        options:{
            display:false
        }
    },
    {
        name:'class_name',
        label:'Class',
        ref: 'class_id',
        type:'select',
        dropdownItems: getSelectList
    },
    {
        name:'is_active',
        label: 'Active',
        type: 'check'
    }
]

export default () => {
    const handleDeleteRow = repo.deleteRow;
    const handleEditAddRow = repo.addOrUpdate;
    const getAll = repo.getAll;

    return <PageBase {...{defaultColumns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
}