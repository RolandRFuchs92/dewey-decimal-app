import React, {useState, useEffect} from 'react';
import { TextField, Modal, Grid, Fade, Paper, makeStyles, Typography, Backdrop} from '@material-ui/core';
import FormButtons from 'components/buttons/FormButtons';

import {addOrUpdateClass, getClasses} from './Class.repo';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding:15
    },
    spacing: {
      
    }
}));

export default ({isOpen = false, handleClose, modalData, updateTable}) => {
    const [data, setData] = useState({});
    const [open, setOpen] = useState(isOpen);

    const classes = useStyles();

    useEffect(() => {
        setData(modalData);
    },[modalData])

    useEffect(() => {
        setOpen(isOpen);
    },[isOpen]);

    const handleSubmit = async () => {
        delete data.Edit;
        delete data.Delete;
        await addOrUpdateClass(data);
        await updateTable();
    }

    const handleChange = name => ({target: {value}}) => { setData({...data, [name]: value});}

    return <Modal open={open} onBackdropClick={handleClose} closeAfterTransition >
        <Fade in={open}>
            <Grid  container >
                <Paper className={classes.paper}>
                    <Grid item >
                        <Typography variant='h6'>{data.class_id ? `Class (${data.class_id})` : 'Teacher'}</Typography>
                    </Grid>
                    <Grid item>
                        <TextField label="Class Name" value={data.class_name ||''} onChange={handleChange('class_name')}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField label="Grade" value={data.grade ||''} onChange={handleChange('grade')}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField label="Is Active" value={data.is_active ||''} onChange={handleChange('is_active')}></TextField>
                    </Grid>
                    <Grid item>
                        <FormButtons onReset={() => setData({})} onSubmit={handleSubmit}></FormButtons>
                    </Grid>
                </Paper>
            </Grid>
        </Fade>
    </Modal>
}