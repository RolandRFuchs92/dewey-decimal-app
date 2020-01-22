import React from 'react';
import MUIDataTable from 'mui-datatables';
import {Grid} from '@material-ui/core';


const columns = [{
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

export default ({teachers, setTeacher}) => {
    const options = {
        selectableRows: false,
        onRowClick: (rowData) => {
            const obj = Object.fromEntries(columns.map(({name}, index) => [name, rowData[index]]));
            setTeacher(obj);
        }
    }

    return (
        <Grid xs>
            <MUIDataTable title='Teachers' data={teachers} columns={columns} options={options}></MUIDataTable>
        </Grid>
    );
}
