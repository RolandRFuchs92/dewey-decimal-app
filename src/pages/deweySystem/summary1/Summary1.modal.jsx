import React,{useEffect, useState} from 'react';

import {TextField, Typography, Grid} from '@material-ui/core';
import Modal from 'components/modal';
import FormButtons from 'components/buttons/FormButtons';
import { addOrUpdate } from './summary1.repo';
import log from 'utils/logger';
import {useAlert} from 'utils/snackbarAlerts';

export default ({open, handleClose, modalData, reset}) => {
    const [val, setVal] = useState(modalData);
    const alert = useAlert();

    const handleOnChange = name => ({target: {value}}) =>{
        setVal({...val, [name]: value});
    }

    const handleSubmit = async () => {
        try {
            const result = await addOrUpdate(val);        
            alert.success(`Successfully ${result === 'add' ? 'added' : 'updated'} ${val.name}!`);
            reset();
        } catch (error) {
            alert.error(`There was an error ${val.dewey_summary_id ? 'updating' : 'adding'} a field. - ${JSON.stringify(error)}`);
        }
    }

    useEffect(() => {
        setVal(modalData);
    },[open, modalData])

    return <Modal {...{open, handleClose}}>
        <Grid item>
            <Typography variant="h5">Summary 1 {val.dewey_summary_id && `(${val.dewey_summary_id})`}</Typography>
        </Grid>
        <Grid item>
            <TextField fullWidth label="Summary Id" value={val.summary_id || ''} onChange={handleOnChange('summary_id')}></TextField>
        </Grid>
        <Grid item>
            <TextField fullWidth label="Name" value={val.name || ''} onChange={handleOnChange('name')}></TextField>
        </Grid>
        <Grid item>
            <FormButtons onReset={() => setVal({})} onSubmit={handleSubmit}></FormButtons>
        </Grid>
    </Modal>
}