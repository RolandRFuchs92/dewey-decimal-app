import React, { useEffect, useState } from 'react';
import {Grid, TextField, Typography} from '@material-ui/core';

export default ({teacher, setTeacher}) => {
    const [val, setVal] = useState({});
    useEffect(() => {
        setVal(teacher);
    },[teacher]);

    return (
    <Grid container item direction="column" xs>
        <Typography variant='h4'>Add Teacher</Typography>
        <TextField label="First name" defaultValue={teacher.first_name}></TextField>
        <TextField label="Last name" defaultValue={teacher.last_name}></TextField>
        <TextField label="Mobile" defaultValue={teacher.mobile}></TextField>
        <TextField label="Email" defaultValue={teacher.email}></TextField>
        <TextField label="Class" defaultValue={teacher.classid}></TextField>
    </Grid>
    )
}