import React,{useEffect, useState} from 'react';
import {TextField, Typography, Grid} from '@material-ui/core';
import { toLower, isPlainObject } from 'lodash';

import Modal from 'components/modal';
import FormButtons from 'components/buttons/FormButtons';
import log from 'utils/logger';
import {useAlert} from 'utils/snackbarAlerts';

export default ({columns, open, handleClose, handleEditAddRow, modalData, reset}) => {
    const [val, setVal] = useState(modalData);
    const alert = useAlert();

    const handleOnChange = name => ({target: {value}}) =>{
        setVal({...val, [name]: value});
    }

    const handleSubmit = async () => {
        try {
            const result = await handleEditAddRow(val);        
            alert.success(`Successfully ${result === 'add' ? 'added' : 'updated'} ${val.name}!`);
            reset();
        } catch (error) {
            alert.error(`There was an error ${val.dewey_summary_id ? 'updating' : 'adding'} a field.`);
            log.error(`Error in src/components/page/ModalBase - Default - ${JSON.stringify(error)}`);
        }
    }

    useEffect(() => {
        setVal(modalData);
    },[open, modalData])

    const fields = convertJsonToModalFields(columns, handleOnChange, val);

    return <Modal {...{open, handleClose}}>
        {fields}
        <Grid item>
            <FormButtons onReset={() => setVal({})} onSubmit={handleSubmit}></FormButtons>
        </Grid>
    </Modal>
}


function convertJsonToModalFields(columns, handleOnChange, modalData){
    const result = columns.map((column)=> {
        const child = getElement({...column, onChange:handleOnChange, value:modalData[column.name]});
        const el = <Grid item>
            {child}
        </Grid>
        return el;
    });
    return result;
} 

function getElement({type, label, value, onChange}){
    if(isPlainObject(type))
        return <Typography variant="h5">{type.header} {!!value && `(${value})`}</Typography>

    switch (toLower(type)) {
        case `textfield`:
            return <TextField fullWidth label={label} value={value || ''} onChange={onChange}></TextField>;
        case `typography`:
            return;
        default:
            return null;
    }
}