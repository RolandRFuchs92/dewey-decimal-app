import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@material-ui/core';

import MUIDataTable from 'mui-datatables';

import { getClasses, ensureCreated } from './Class.repo';
import Modal from './Class.Modal';

const tableOptions = {
    selectableRows: 'none',
   
}

const columns = [
    {
        name: 'class_id',
        label: 'Class Id' 
    },{
        name: 'class_name',
        label: 'Name' 
    },{
        name: 'grade',
        label: 'Grade' 
    },{
        name: 'is_active',
        label: 'Active'
    },{
        name: 'Name',
        label: '<'
    }
]

export default () => {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState(tableOptions);
    const [modalData, setModalData] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    options.onRowClick = rowData => {
        const obj = Object.fromEntries(columns.map(({name}, index) => [name,rowData[index]]));
        setModalData(obj);
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        (async () => {
            await ensureCreated();
            setData(await getClasses());    
        })();
    },[]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item ><Typography >Class</Typography></Grid>
            <MUIDataTable title='Classes' options={tableOptions} columns={columns} data={data}/>
            <Grid item ><Modal isOpen={isOpen} handleClose={handleClose} modalData={modalData}></Modal></Grid>
        </Grid>
    )
}