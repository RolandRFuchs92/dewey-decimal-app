import React, {useEffect, useState} from 'react';
import { Grid } from '@material-ui/core';

import TeacherForm from './TeacherForm';
import TeacherTable from './TeacherTable';
import {getTeachers} from './Teacher.repo';

export default () => {
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState({});
    useEffect(() => {
        (async () => {
            const result = await getTeachers();
            setTeachers(result);
        })();
    },[]);

    return <Grid container justify="center" spacing={2}>
        <TeacherForm {...({teacher, setTeacher})}></TeacherForm>
        <TeacherTable teachers={teachers} setTeacher={setTeacher}></TeacherTable>
    </ Grid>
}