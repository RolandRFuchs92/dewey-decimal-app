import React from 'react';
import { Grid } from '@material-ui/core';

import TeacherForm from './TeacherForm';
import TeacherTable from './TeacherTable';

export default () => {
    return <Grid container justify="center" spacing={2}>
        <TeacherForm></TeacherForm>
        <TeacherTable></TeacherTable>
    </ Grid>
}