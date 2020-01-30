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

    useEffect(() => {},[teacher])

    const handleSetTeacher = (teacher) => {
        setTeacher(teacher);
    }

    return <Grid container justify="center" spacing={2}>
        <TeacherForm teacher={teacher} setTeacher={handleSetTeacher}></TeacherForm>
        <TeacherTable teachers={teachers} setTeacher={handleSetTeacher}></TeacherTable>
    </ Grid>
}