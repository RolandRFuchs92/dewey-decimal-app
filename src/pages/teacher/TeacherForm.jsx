import React, { useEffect, useState } from 'react';
import { Snackbar, Grid, TextField, Typography} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FormButtons from 'components/buttons/FormButtons';

import {createTeacher, getTeachers } from './Teacher.repo';

function Alert({ open, onClose, ...props}) {
    debugger;
    useEffect(()=>{},[open])
    return <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <MuiAlert elevation={6} variant="filled" {...props} >Successfully saved a new teacher</MuiAlert>
  </Snackbar>;
  }

export default ({teacher, setTeacher}) => {
    const [val, setVal] = useState({...teacher});
    const [title, setTitle] =useState('Add Teacher');
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        setVal(teacher);
        setTitle(`Teacher ${teacher.teacher_id ? `(${teacher.teacher_id})` :''}`)
    },[teacher]);

    const handleAlertClose =() => {setIsOpen(false)}
    const handleChange = (name) => ({target: {value}}) => setVal({...val, [name]: value});
    const handleSubmit = () => {
        try{
            createTeacher(val);
            (async () => {
                setTeacher(await getTeachers());
                setIsOpen(true);
            })()
        } catch(err){

        }
    };
    const handleReset = () => {
        setVal({});
        setTeacher({});
    }


    return (
    <Grid container item direction="column" xs>
        <Alert open={isOpen} autoHideDuration={6000} onClose={handleAlertClose}></Alert>
        <Typography variant='h4'>{title}</Typography>
        <TextField label='First Name' value={val['first_name'] || ''} onChange={handleChange('first_name')} ></TextField>
        <TextField label="Last name" value={val['last_name'] || ''} onChange={handleChange('last_name')}></TextField>
        <TextField label="Mobile" value={val['mobile'] || ''} onChange={handleChange('mobile')}></TextField>
        <TextField label="Email" value={val['email'] || ''} onChange={handleChange('email')}></TextField>
        <TextField label="Class"value={val['class_id'] || ''} onChange={handleChange('class_id')}></TextField>
        <FormButtons onReset={handleReset} onSubmit={handleSubmit}></FormButtons>
    </Grid>
    )
}