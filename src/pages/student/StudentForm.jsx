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
let selectedStudent;

export default ({ student, setStudent, setStudentData }) => {
	setStudentList = setStudentData;
	const [newStudent, setSelectedStudent] = useState({});

	useEffect(() => {
		setSelectedStudent({...student});
		selectedStudent = {...student};
	},[student]);

	const handleChange = name => value => setSelectedStudent({...newStudent, [name]: value});
	const classes = useStyles();

	return (
		<Grid
			container
			direction='column'
			justify='flex-start'
			alignItems='flex-start'
			spacing={2}
		>
			<Paper className={classes.paper}>
				<SplitStudentForm
					label={`Student${newStudent.studentId ? `(${newStudent.studentId})` : ''}`}
				/>
				<FormRow label='First name' name='firstName' onChange={handleChange}></FormRow>
				<FormRow label='Last name' name='lastName' onChange={handleChange}></FormRow>
				<FormRow label='Birthday' name='birthdate' onChange={handleChange}></FormRow>
				<FormRow label='Class' name='classId' onChange={handleChange}></FormRow>
				<SplitStudentForm label='Mother' />
				<FormRow label='Name' name='motherName' onChange={handleChange}></FormRow>
				<FormRow label='Mobile' name='motherMobile' onChange={handleChange}></FormRow>
				<FormRow label='Email' name='motherEmail' onChange={handleChange}></FormRow>
				<SplitStudentForm label='Father' />
				<FormRow label='Name' name='fatherName' onChange={handleChange}></FormRow>
				<FormRow label='Mobile' name='fatherMobile' onChange={handleChange}></FormRow>
				<FormRow label='Email' name='fatherEmail' onChange={handleChange}></FormRow>
				<Button
					variant='outlined'
					color='default'
					className={classes.submitButton}
					size='small'
					onClick={() => handleReset(setStudent,setSelectedStudent)}
				>
					Reset
				</Button>
				<Button
					variant='contained'
					color='primary'
					className={classes.submitButton}
					size='small'
					onClick={() => handleSubmit(newStudent, handleReset(setStudent))}
				>
					Submit
				</Button>
			</Paper>
		</Grid>
	);
};

const FormRow = ({ label, name, onChange}) => {
	const [val, setVal] = useState('');
	useEffect(() => {
		if(!selectedStudent) return;
		setVal(selectedStudent[name] || '');
	}, [selectedStudent, name])

	const handleChange = ({ target: { value } }) => {
		setVal(value);
		onChange(name)(value);
	};

	return (
		<Grid item xs>
			<TextField
				label={label}
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

const handleSubmit = async (student, setStudent)=> {
	try {
		await addOrUpdateStudent(student);
		setStudentList(await getStudentData());
	} catch (error) {
		alert(error);
	}
};

const handleReset = (setStudent)=> {
	setStudent({});
};
