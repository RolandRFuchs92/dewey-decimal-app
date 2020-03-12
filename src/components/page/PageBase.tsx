import React, {useState, useEffect} from 'react';
import MUIDataTable from 'mui-datatables';
import {Fade, Slide} from '@material-ui/core';

import log from 'utils/logger';
import EditDeleteCol, {useAddButton} from 'utils/tableButtons';
import Modal from './ModalBase';
import { useDialog } from 'utils/dialog';
import { useAlert } from 'utils/snackbarAlerts';

import { DefaultColumnModel } from './PageBase.type';

type PageBaseModel = {
    defaultColumns: DefaultColumnModel[];
    getAll: () => { [key: string]: string};
    handleDeleteRow: (rowData: {[key: string]: string}) => Promise<void>;
    handleEditAddRow: () => Promise<void>;
    modal?: JSX.Element | null;
}

type jsonObj = {[key: string]: string};

export default ({defaultColumns, getAll, handleDeleteRow, handleEditAddRow, modal = null }: PageBaseModel) => {
    const [options, setOptions] = useState({});
    const [columns, setColumns] = useState(defaultColumns);
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const showDialog = useDialog();
    const alert = useAlert();
    
    const handleEditAdd = (rowData: jsonObj) => {
        let obj = null;
        rowData && (obj = objectFromRowData(rowData));
        setModalData(obj);
        setOpenModal(true);
    };

    const handleYesOnDelete = async (rowData: jsonObj) => {
        try {
            await handleDeleteRow(rowData);
            await reset();
            alert.success(`Successfully deleted ${rowData.name}`);
        } catch(error)  {
            alert.error(`There was an error deleting ${rowData.name}!`);
            log.error(error);
        }
    }

    const objectFromRowData = (rowData: jsonObj) => Object.fromEntries(columns.map(({name}, index) => [name,rowData[index] || '']));
    const handleDelete = (rowData: jsonObj) => {
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
            pagination: true,
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
        <Fade in={true} direction="up" timeout={800}> 
            <div>
                <MUIDataTable {...({options, columns, data})}></MUIDataTable>
                {
                    modal 
                    || <Modal {...{columns, open:openModal, handleClose, handleEditAddRow, modalData, reset}}></Modal>
                }
            </div>
        </Fade>
    </>
}