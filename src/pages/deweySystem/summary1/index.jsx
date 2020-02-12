import React, {useState, useEffect} from 'react';
import MUIDataTable from 'mui-datatables';
import {Slide} from '@material-ui/core';

import EditDeleteCol, {useAddButton} from 'utils/tableButtons';
import { getAll, deleteRow} from './summary1.repo';
import { useDialog } from 'utils/dialog';
import { useAlert } from 'utils/snackbarAlerts';
import Modal from './Summary1.modal';

const defaultColumns = [
    {
        label: 'Id',
        name: 'dewey_summary_id'
    },
    {
        label: "Name",
        name: 'name'
    },
    {
        label: 'Summary Id',
        name: 'summary_id'
    },
]

export default () => {
    const [options, setOptions] = useState({});
    const [columns, setColumns] = useState(defaultColumns);
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const showDialog = useDialog();
    const alert = useAlert();
    
    const handleEditAdd = (rowData) => {
        let obj = null;
        rowData && (obj = objectFromRowData(rowData));
        setModalData(obj);
        setOpenModal(true);
    };

    const handleYesOnDelete = async rowData => {
        try {
            await deleteRow(rowData.dewey_summary_id);
            await reset();
            alert.success(`Successfully deleted ${rowData.name}`);
        } catch  {
            alert.error(`There was an error deleting ${rowData.name}!`);
        }
    }

    const objectFromRowData = (rowData) => Object.fromEntries(columns.map(({name}, index) => [name,rowData[index]]));
    const handleDelete = rowData => {
        const obj = objectFromRowData(rowData);
        showDialog({ title: 'Are you sure?', description: `Really delete ${obj.name}?`, handleYes:() => handleYesOnDelete(obj)})
    }

    const handleClose = () => setOpenModal(false);
    const addButton = useAddButton(handleEditAdd);
    const reset = async () => {
        setData(await getAll());
        setOpenModal(false);
    }

    useEffect(() => {
        setOptions({
            selectableRows: 'none',
            ...addButton
        });

        setColumns([
            ...defaultColumns,
            ...EditDeleteCol(handleEditAdd, handleDelete)
        ]);

        (async () => {
            await reset();
        })();

    },[])

    return <>
        <Slide in={true} direction="up" timeout={500}> 
            <div>
            <MUIDataTable {...({options, columns, data})}></MUIDataTable>
            <Modal {...{open:openModal, modalData, handleClose, reset}}></Modal>
            </div>
        </Slide>
    </>
}