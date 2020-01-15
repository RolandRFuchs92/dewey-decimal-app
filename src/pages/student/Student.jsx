import React from 'react';
import {Typography} from '@material-ui/core';

import { ensureCreated } from './Student.repo';
import StudentForm from './StudentForm';


export default () => {
	ensureCreated();
	return <>
		<Typography variant="h6" >Student</Typography>
		<StudentForm></StudentForm>
	</>;
};
