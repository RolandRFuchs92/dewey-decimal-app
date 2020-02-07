import React, {useEffect, useState} from 'react';
import {Grid, Typography, makeStyles} from '@material-ui/core';

import MUIDataTable from 'mui-datatables';

import { getClasses, ensureCreated, hideClass } from './Class.repo';
import Modal from './Class.Modal';
import Icons from 'components/icons';
import {useAlert} from 'utils/snackbarAlerts'

import YesNo from 'components/dialog/YesNo';
import {useDialogs} from 'utils/dialog';

const useStyles = makeStyles(theme => ({
    footer: {
        color: theme.palette.success.main,
        fontSize: 30, 
        textAlign:'right', 
        paddingRight:15,
        alignSelf:'flex-end'
    },
    edit: {
        fontSize: 20,
        color: theme.palette.info.main
    },
    delete: {
        fontSize: 20,
        color: theme.palette.error.main
    }
}))



const DeleteComponent = ({handleClick}) => {
    const classes = useStyles();
    return <div onClick={handleClick} className={classes.delete}>
                         {Icons.Delete}
                    </div>
}

const EditComponent = ({handleClick}) => {
    const classes = useStyles();
    return <div onClick={handleClick} className={classes.edit}>
                {Icons.Edit}
        </div>
}


export default () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [modalData, setModalData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const alert = useAlert();
    const dialog = useDialogs();

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
            {
                name: "Edit",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return <EditComponent handleClick={() => handleClick(tableMeta.rowData)} />
                    }
                }
            },  {
            name: "Delete",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                        return <DeleteComponent handleClick={() => handleDelete(tableMeta.rowData)} />
                    }
                }
            },
        ]
    }
    
    
    const handleDelete = rowData => {
        const obj = Object.fromEntries(getColumns().map(({name}, index) => [name,rowData[index]]));
        dialog({ title: 'Are you sure?', description: `Really delete grade ${obj.grade} - ${obj.class_name}?`, handleYes: () => handleYesForDelete(obj.class_id) })
    }
    const handleClick = rowData => {
        const obj = Object.fromEntries(getColumns().map(({name}, index) => [name,rowData[index]]));
        setModalData(obj);
        setIsOpen(true);
    }

    const tableOptions = {
        selectableRows: 'none',
        customFooter: () => <td className={classes.footer} onClick={handleClick}>{Icons.Add}</td>
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
            await ensureCreated();
            await resetPage();
        })();
    },[]);

    useEffect(() => {
    },[data])

    return (
        <Grid container direction="column" spacing={2}>
            <MUIDataTable title='Classes' options={tableOptions} columns={getColumns()} data={data}/>
            <Grid item ><Modal isOpen={isOpen} handleClose={handleClose} modalData={modalData} updateTable={() => resetPage()}></Modal></Grid>
        </Grid>
    )
}