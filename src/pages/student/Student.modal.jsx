import React, { useEffect, useState } from 'react';
import {
	TextField,
	makeStyles,
	Grid,
	Paper,
	Divider,
	Typography,
	Button,
	Modal
} from '@material-ui/core';

import { addOrUpdateStudent } from './Student.repo';
import FormButtons from 'components/buttons/FormButtons';
import {useAlert} from 'utils/snackbarAlerts';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
		padding:15,
		width:300
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

export default ({ isOpen = false, handleClose, student, reset }) => {
	const [newStudent, setSelectedStudent] = useState({});
	const alerts = useAlert();
	useEffect(() => {
		setSelectedStudent(student);
	},[student]);

	const handleSubmit = async () => {
		let isAdd;
		const studentName = `${newStudent.first_name || 'empty'} ${newStudent.last_name || ''}`; 
		try {
			isAdd = await addOrUpdateStudent(newStudent) === 'add';
			reset();	
			alerts.success(`Successfully ${isAdd ? 'added' : 'updated'} ${studentName}`);
		} catch (error) {
			alerts.error(`There was an error ${isAdd? 'adding' : 'updating'} ${studentName}`);
		}
	}
	const handleChange = name => ({target:{value}}) =>{ setSelectedStudent({...newStudent, [name]: value})};
	const classes = useStyles();


	return (
		<Modal open={isOpen} onBackdropClick={handleClose} closeAfterTransition >
			<Grid container>
				<Paper className={classes.paper}>
					<SplitStudentForm
						label={`Student${newStudent.studentId ? `(${newStudent.studentId})` : ''}`}
					/>
					<TextField fullWidth label='First name' value={newStudent.first_name || ''} onChange={handleChange('first_name')} />
					<TextField fullWidth label='Last name' value={newStudent.last_name || ''} onChange={handleChange('last_name')} />
					<TextField fullWidth label='Birthday' value={newStudent.birthdate || ''} onChange={handleChange('birthdate')} />
					<TextField fullWidth label='Class' value={newStudent.class_id || ''} onChange={handleChange('class_id')} />
					<SplitStudentForm label='Mother' />
					<TextField fullWidth label='Name' value={newStudent.mother_name || ''} onChange={handleChange('mother_name')} />
					<TextField fullWidth label='Mobile' value={newStudent.mother_mobile || ''} onChange={handleChange('mother_mobile')} />
					<TextField fullWidth label='Email' value={newStudent.mother_email || ''} onChange={handleChange('mother_email')} />
					<SplitStudentForm label='Father' />
					<TextField fullWidth label='Name' value={newStudent.father_name || ''} onChange={handleChange('father_name')} />
					<TextField fullWidth label='Mobile' value={newStudent.father_mobile || ''} onChange={handleChange('father_mobile')} />
					<TextField fullWidth label='Email' value={newStudent.father_email || ''} onChange={handleChange('father_email')} />
					<FormButtons onReset={() => setSelectedStudent({})} onSubmit={handleSubmit}></FormButtons>
				</Paper>
			</Grid>
		</Modal>
	);
};

const FormRow = ({ label, name, onChange}) => {
	const [val, setVal] = useState('');
	useEffect(() => {
	}, [name])

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
		</>
	);
}