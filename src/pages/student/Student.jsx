import React, {useState} from 'react';

import PageBase from 'components/page/PageBase';
import repo from './Student.repo';
import { getSelectList } from 'pages/class/Class.repo';
import TableButton from 'components/buttons/TableButtons';
import Icons from 'components/icons';

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
    const [open, setOpen] = useState(false);
    const handleDeleteRow = repo.deleteRow;
    const handleEditAddRow = repo.addOrUpdate;
    const getAll = repo.getAll;

    const columns = defaultColumns.concat(TableButton(() => setOpen(true), 'Profile', Icons.Student));

    return <>
        <PageBase {...{defaultColumns: columns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
        
    </>
}