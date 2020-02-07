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
		<Grid container spacing={2}>
			<StudentList
				setStudent={setStudent}
				studentData={studentData}
				setStudentData={setStudentData}
			></StudentList>
				<StudentForm
				student={student}
				setStudent={setStudent}
				setStudentData={setStudentData}
			></StudentForm>
		</Grid>
	);
};
