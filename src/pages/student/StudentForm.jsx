import React, { useEffect, useState } from 'react';
import {
	TextField,
	makeStyles,
	Grid,
	Paper,
	Divider,
	Typography,
	Button,
} from '@material-ui/core';

import { addOrUpdateStudent, getStudentData } from './Student.repo';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: 15,
	},
	baseTitle: {
		marginTop: 10,
		display: 'table',
	},
	submitButton: {
		margin: 5,
		marginTop: 15,
	},
}));

let setStudentList;

export default ({ /*student, setStudent,*/ setStudentData }) => {
	const [student, setStudent] = useState({});
	setStudentList = setStudentData;
	const classes = useStyles();
	const handleChange = ({ target: { name, value } }) => {
		setStudent({ ...student, [name]: value });
	};

	return (
		<Grid
			container
			direction='column'
			justify='flex-start'
			alignItems='flex-start'
		>
			<Paper className={classes.paper}>
				<SplitStudentForm
					label={`Student${student.studentId ? `(${student.studentId})` : ''}`}
				/>
				<FormRow label='First name' name='firstName'></FormRow>
				<FormRow label='Last name' name='lastName'></FormRow>
				<FormRow label='Birthday' name='birthdate'></FormRow>
				<FormRow label='Class' name='classId'></FormRow>
				<SplitStudentForm label='Mother' />
				<FormRow label='Name' name='motherName'></FormRow>
				<FormRow label='Mobile' name='motherMobile'></FormRow>
				<FormRow label='Email' name='motherEmail'></FormRow>
				<SplitStudentForm label='Father' />
				<FormRow label='Name' name='motherName'></FormRow>
				<FormRow label='Mobile' name='motherMobile'></FormRow>
				<FormRow label='Email' name='motherEmail'></FormRow>
				<Button
					variant='outlined'
					color='default'
					className={classes.submitButton}
					size='small'
					onClick={() => handleReset(setStudent)}
				>
					Reset
				</Button>
				<Button
					variant='contained'
					color='primary'
					className={classes.submitButton}
					size='small'
					onClick={() => handleSubmit(student)}
				>
					Submit
				</Button>
			</Paper>
		</Grid>
	);
};

const FormRow = ({ label, name }) => {
	const [val, setVal] = useState(null);

	const handleChange = ({ target: { name, value } }) => {
		setVal(value);
	};

	return (
		<Grid item xs>
			<TextField
				label={label}
				name={name}
				// value={student[name]}
				value={val}
				onChange={handleChange}
			></TextField>
		</Grid>
	);
};

function SplitStudentForm({ label }) {
	const classes = useStyles();
	const [displayLabel, setDisplayLabel] = useState(label);
	useEffect(() => {
		setDisplayLabel(label);
	}, [label]);

	return (
		<>
			<Typography
				align='left'
				color='textPrimary'
				className={classes.baseTitle}
				variant='overline'
			>
				{displayLabel}
			</Typography>
			<Divider className={classes.divider}></Divider>
		</>
	);
}

const handleSubmit = async student => {
	try {
		await addOrUpdateStudent(student);
		setStudentList(await getStudentData());
	} catch (error) {
		alert(error);
	}
};

const handleReset = setStudent => {
	setStudent({});
};
