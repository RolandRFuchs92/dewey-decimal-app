import React, {useEffect, useState} from 'react';
import {Grid, Typography, makeStyles} from '@material-ui/core';

import MUIDataTable from 'mui-datatables';

import { getClasses, ensureCreated } from './Class.repo';
import Modal from './Class.Modal';
import Icons from 'components/icons';

const useStyles = makeStyles(theme => ({
    footer: {
        color: theme.palette.success.main,
        fontSize: 20, 
        textAlign:'right', 
        paddingRight:15
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

const DeleteComponent = () => {
    const classes = useStyles();
    return <div onClick={() => alert("Delete")} className={classes.delete}>
                         {Icons.Delete}
                    </div>
}

const EditComponent = () => {
    const classes = useStyles();
    return <div onClick={() => alert("edit")} className={classes.edit}>
                         {Icons.Edit}
                    </div>
}

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
                return <EditComponent/>
              }
            }
          },  {
            name: "Delete",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                return <DeleteComponent/>
              }
            }
          },
    ]
}



export default () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [modalData, setModalData] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = rowData => {
        const obj = Object.fromEntries(getColumns().map(({name}, index) => [name,rowData[index]]));
        setModalData(obj);
        setIsOpen(true);
    }

    const tableOptions = {
        selectableRows: 'none',
        customFooter:  (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => <span className={classes.footer} onClick={handleClick}>{Icons.Add}</span>
    }
    const [options, setOptions] = useState(tableOptions);

    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        (async () => {
            await ensureCreated();
            const classes = await getClasses();


            setData(classes);    
        })();
    },[]);

    return (
        <Grid container direction="column" spacing={2}>
            <MUIDataTable title='Classes' options={tableOptions} columns={getColumns()} data={data}/>
            <Grid item ><Modal isOpen={isOpen} handleClose={handleClose} modalData={modalData}></Modal></Grid>
        </Grid>
    )
}