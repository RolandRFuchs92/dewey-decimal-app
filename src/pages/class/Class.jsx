import React, {useEffect, useState} from 'react';
import {Grid, Typography, makeStyles} from '@material-ui/core';

import MUIDataTable from 'mui-datatables';

import { getClasses, ensureCreated, hideClass } from './Class.repo';
import Modal from './Class.Modal';
import Icons from 'components/icons';

import YesNo from 'components/dialog/YesNo';

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteText, setDeleteText] = useState('');
    const [classIdToDelete, setClassIdToDelete] = useState(0);

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
        setDeleteText(`Are you sure about deleting Grade ${obj.grade} ${obj.class_name}?`);
        setIsDialogOpen(true);
        setClassIdToDelete(obj.class_id);
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
    
    const handleYesForDelete = async () => {
        try{
            await hideClass(classIdToDelete);
            await resetPage()
        } catch(e){

        }
    }

    const resetPage = async () => {
        setData(await getClasses());   
        setIsOpen(false);
        setIsDialogOpen(false);
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
            <YesNo
                open={isDialogOpen} 
                title='Really delete class?'
                text={deleteText} 
                handleClose={() => {setIsDialogOpen(false)}} 
                handleYes={handleYesForDelete} 
                handleNo={() => {setIsDialogOpen(false)}} />
        </Grid>
    )
}