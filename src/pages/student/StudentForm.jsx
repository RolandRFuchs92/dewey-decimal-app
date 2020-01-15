import React, { useState, useEffect} from 'react';
import { TextField, makeStyles, Grid, Paper, TableContainer, TableSortLabel, TableHead, TableCell, Table, TableBody, TableRow} from '@material-ui/core';

import {getStudentColumnNames} from './Student.repo';

const useStyles = makeStyles(theme =>({
    root: {
        flexGrow:1
    }
}));

export default () => {
    const classes = useStyles();
    const [student, setStudent] = useState({});

    const handleChange = (({target: {name, value}})=> {
        debugger;
        setStudent({...student, [name] : value});
    })

    const FormRow = ({label, name}) => (
        <Grid item xs> 
            <TextField label={label} name={name} value={student[name]} onChange={handleChange}></TextField>
        </Grid>
    )

    return <Grid container>
            <Grid item md={3}>
                <Grid container direction="column" justify='flex-start' alignItems='flex-start'>
                    <Paper>
                        <FormRow label="First name" name="firstName"></FormRow>
                        <FormRow label="Last name" name="lastName"></FormRow>
                        <FormRow label="Birthday" name="birthdate"></FormRow>
                        <FormRow label="Current Grade" name="currentGrade"></FormRow>
                        <FormRow label="Year started school" name="yearStarted"></FormRow>
                        <FormRow label="Class" name="class"></FormRow>
                    </Paper>
                    <Paper>
                        <FormRow label="Mother name" name="motherName"></FormRow>
                        <FormRow label="Mother mobile" name="motherMobile"></FormRow>
                        <FormRow label="Mother email" name="motherEmail"></FormRow>
                    </Paper>
                    <Paper>
                        <FormRow label="Father name" name="motherName"></FormRow>
                        <FormRow label="Father mobile" name="motherMobile"></FormRow>
                        <FormRow label="Father email" name="motherEmail"></FormRow>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item md={9}>
                <Grid container direction="column" justify='flex-start' alignItems='flex-start' >
                   <StudentList></StudentList>
                </Grid>
            </Grid>
        </Grid>
}

function StudentList() {
    return <TableContainer>
        <Table>
            <StudentTableHead></StudentTableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Nudu</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}

function StudentTableHead(){
    const [columnHeaders, setColumnHeaders] = useState([]);
    useEffect(() => {
        const method = async () => {
            const result = await getStudentColumnNames();
            setColumnHeaders(result);
        }
        
        method();
    }, []);
    debugger;
    return <TableHead>
        <TableRow>
            {
                columnHeaders.map(i => <TableCell key={i}>
                        <TableSortLabel>
                            {i}
                        </TableSortLabel>
                    </TableCell>
                
            )}
        </TableRow>
    </TableHead>
}