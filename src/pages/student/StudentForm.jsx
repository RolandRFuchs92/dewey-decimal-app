import React, { useState} from 'react';
import { TextField, makeStyles, Grid, Divider} from '@material-ui/core';

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
                    <Grid item xs={3}>
                        <Grid container direction="column" justify='flex-start' alignItems='flex-start'>
                            <FormRow label="First name" name="firstName"></FormRow>
                            <FormRow label="Last name" name="lastName"></FormRow>
                            <FormRow label="Birthday" name="birthdate"></FormRow>
                            <FormRow label="Current Grade" name="currentGrade"></FormRow>
                            <FormRow label="Year started school" name="yearStarted"></FormRow>
                            <FormRow label="Class" name="class"></FormRow>
                            <Divider></Divider>
                            <FormRow label="Mother name" name="motherName"></FormRow>
                            <FormRow label="Mother mobile" name="motherMobile"></FormRow>
                            <FormRow label="Mother email" name="motherEmail"></FormRow>
                            <Divider></Divider>
                            <FormRow label="Father name" name="motherName"></FormRow>
                            <FormRow label="Father mobile" name="motherMobile"></FormRow>
                            <FormRow label="Father email" name="motherEmail"></FormRow>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container direction="column" justify='flex-start' alignItems='flex-start'>
                            <FormRow label="First name" name="firstName"></FormRow>
                            <FormRow label="Last name" name="lastName"></FormRow>
                            <FormRow label="Birthday" name="birthdate"></FormRow>
                            <FormRow label="Current Grade" name="currentGrade"></FormRow>
                            <FormRow label="Year started school" name="yearStarted"></FormRow>
                            <FormRow label="Class" name="class"></FormRow>
                            <Divider></Divider>
                            <FormRow label="Mother name" name="motherName"></FormRow>
                            <FormRow label="Mother mobile" name="motherMobile"></FormRow>
                            <FormRow label="Mother email" name="motherEmail"></FormRow>
                            <Divider></Divider>
                            <FormRow label="Father name" name="motherName"></FormRow>
                            <FormRow label="Father mobile" name="motherMobile"></FormRow>
                            <FormRow label="Father email" name="motherEmail"></FormRow>
                        </Grid>
                    </Grid>
                </Grid>
}