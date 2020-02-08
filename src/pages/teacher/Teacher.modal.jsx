import React, { useEffect, useState } from 'react';
import { Paper, Modal, Grid, TextField, Typography, makeStyles } from '@material-ui/core';
import FormButtons from 'components/buttons/FormButtons';

import {createTeacher, getTeachers } from './Teacher.repo';

const useStyles = makeStyles(theme => ({
    paper: {
		position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
		padding:15,
		width:300
	},
}))

export default ({isOpen, teacher, reset, handleClose}) => {
    const [val, setVal] = useState({...teacher});
    const [title, setTitle] =useState('Add Teacher');
    const classes = useStyles();
    useEffect(() => {
        
    }, [])

    useEffect(() => {
        setVal(teacher);
        setTitle(`Teacher ${teacher.teacher_id ? `(${teacher.teacher_id})` :''}`)
    },[teacher]);

    const handleChange = (name) => ({target: {value}}) => setVal({...val, [name]: value});
    const handleSubmit = () => {
        try{
        } catch(err){

        }
    };

    const handleReset = () => {
        setVal({});
    }

    return (
    <Modal open={isOpen} onBackdropClick={handleClose} closeAfterTransition>
        <Grid container>
            <Paper className={classes.paper}>
                <Typography variant='h4'>{title}</Typography>
                <TextField fullWidth label='First Name' value={val['first_name'] || ''} onChange={handleChange('first_name')} ></TextField>
                <TextField fullWidth label="Last name" value={val['last_name'] || ''} onChange={handleChange('last_name')}></TextField>
                <TextField fullWidth label="Mobile" value={val['mobile'] || ''} onChange={handleChange('mobile')}></TextField>
                <TextField fullWidth label="Email" value={val['email'] || ''} onChange={handleChange('email')}></TextField>
                <TextField fullWidth label="Class"value={val['class_id'] || ''} onChange={handleChange('class_id')}></TextField>
                <FormButtons onReset={handleReset} onSubmit={handleSubmit}></FormButtons>
            </Paper>
        </Grid>
    </Modal>
    )
}