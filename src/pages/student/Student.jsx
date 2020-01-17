import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { ensureCreated } from './Student.repo';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

export default () => {
	const [student, setStudent] = useState({});
	const [studentData, setStudentData] = useState([]);

	ensureCreated();
	return (
		<Grid container spacing={3}>
			<Grid item sm={2}>
				<StudentForm
					student={student}
					setStudent={setStudent}
					setStudentData={setStudentData}
				></StudentForm>
			</Grid>
			<Grid item sm={10}>
				<StudentList
					setStudent={setStudent}
					studentData={studentData}
					setStudentData={setStudentData}
				></StudentList>
			</Grid>
		</Grid>
	);
};
