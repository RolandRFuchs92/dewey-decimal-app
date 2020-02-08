import React, {useEffect, useState} from 'react';
import MUIDataTable from 'mui-datatables';

import AddUpdate from 'utils/tableButtons';
import { getTeachers } from './Teacher.repo';
import { useAddButton } from 'utils/tableButtons';

const columnConfig = [{
    name: 'teacher_id',
    label: 'Id',
},{
    name: 'first_name',
    label: 'Name',
},{
    name: 'last_name',
    label: 'Surname',
},{
    name: 'mobile',
    label: 'Mobile',
},{
    name: 'Email',
    label: 'Email',
},{
    name: 'is_active',
    label: 'Active',
},{
    name: 'class_id',
    label: 'Class',
}];

const  tableOptions = {
    selectableRows: 'none',
}

export default () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const tableAddButton = useAddButton();
    const options = {
        ...tableOptions,
        ...tableAddButton
    }

    useEffect(() => {
       
        (async () => {
            let editButtons = await AddUpdate(() => {}, () => {});
            setColumns([...columnConfig, ...editButtons])
            reset();
        })();
      
    },[]);

    const reset = async () => {
        setData(await getTeachers());
        setIsOpen(false);
    }

    return (
        <>
            <MUIDataTable title='Teachers' data={data} columns={columns} options={options} />
        </>
    );
}
