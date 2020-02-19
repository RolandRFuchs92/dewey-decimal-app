import React, {useEffect, useState} from 'react';
import {Grid, makeStyles, Fade} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';

import { getClasses, hideClass } from './Class.repo';
import Modal from './Class.Modal';
import Icons from 'components/icons';
import {useAlert} from 'utils/snackbarAlerts'

import {useDialog} from 'utils/dialog';
import EditDeleteCol, {useAddButton} from 'utils/tableButtons';
import appSettings from 'appSettings';


export default () => {
    const [data, setData] = useState([]);
    const [modalData, setModalData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const alert = useAlert();
    const dialog = useDialog();

    const getColumns = () => {
        return [
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
            },
            ...(EditDeleteCol(handleEditAdd, handleDelete))
        ]
    }
    
    
    const handleDelete = rowData => {
        const obj = Object.fromEntries(getColumns().map(({name}, index) => [name,rowData[index]]));
        dialog({ title: 'Are you sure?', description: `Really delete grade ${obj.grade} - ${obj.class_name}?`, handleYes: () => handleYesForDelete(obj.class_id) })
    }
    const handleEditAdd = rowData => {
        const obj = Object.fromEntries(getColumns().map(({name}, index) => [name,rowData[index]]));
        setModalData(obj);
        setIsOpen(true);
    }

    const tableOptions = {
        selectableRows: 'none',
        ...(useAddButton(handleEditAdd))
    }
    
    const handleYesForDelete = async (classIdToDelete) => {
        try{
            await hideClass(classIdToDelete);
            await resetPage()
            alert.success(`Successfully removed class[${classIdToDelete}]`);
        } catch(e){
            alert.error(`Error removing class[${classIdToDelete}]`);
        }
    }

    const resetPage = async () => {
        setData(await getClasses());   
        setIsOpen(false);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        (async () => {
            await resetPage();
        })();
    },[]);

    useEffect(() => {
    },[data])

    return (
        <Grid container direction="column" spacing={2}>
            <Fade in={true} timeout={appSettings.fadeTransitionDuration}>
                <div>
                    <MUIDataTable options={tableOptions} columns={getColumns()} data={data}/>
                    <Grid item ><Modal isOpen={isOpen} handleClose={handleClose} modalData={modalData} updateTable={() => resetPage()}></Modal></Grid>
                </div>
            </Fade>
        </Grid>
    )
}