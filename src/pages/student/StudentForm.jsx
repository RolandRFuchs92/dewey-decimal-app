import React, { useState, useEffect } from 'react';
import { startCase } from 'lodash';
import {
	TextField,
	makeStyles,
	Grid,
	Paper,
	TableContainer,
	TableSortLabel,
	TableHead,
	TableCell,
	Table,
	TableBody,
	TableRow,
} from '@material-ui/core';

import { getStudentColumnNames, getStudentData } from './Student.repo';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
}));

export default () => {
	const classes = useStyles();
	const [student, setStudent] = useState({});

	const handleChange = ({ target: { name, value } }) => {
		debugger;
		setStudent({ ...student, [name]: value });
	};

	const FormRow = ({ label, name }) => (
		<Grid item xs>
			<TextField
				label={label}
				name={name}
				value={student[name]}
				onChange={handleChange}
			></TextField>
		</Grid>
	);

	return (
		<Grid container spacing={3}>
			<Grid item>
				<Grid
					container
					direction='column'
					justify='flex-start'
					alignItems='flex-start'
				>
					<Paper>
						<FormRow label='First name' name='firstName'></FormRow>
						<FormRow label='Last name' name='lastName'></FormRow>
						<FormRow label='Birthday' name='birthdate'></FormRow>
						<FormRow label='Current Grade' name='currentGrade'></FormRow>
						<FormRow label='Year started school' name='yearStarted'></FormRow>
						<FormRow label='Class' name='class'></FormRow>
					</Paper>
					<Paper>
						<FormRow label='Mother name' name='motherName'></FormRow>
						<FormRow label='Mother mobile' name='motherMobile'></FormRow>
						<FormRow label='Mother email' name='motherEmail'></FormRow>
					</Paper>
					<Paper>
						<FormRow label='Father name' name='motherName'></FormRow>
						<FormRow label='Father mobile' name='motherMobile'></FormRow>
						<FormRow label='Father email' name='motherEmail'></FormRow>
					</Paper>
				</Grid>
			</Grid>
			<Grid item>
				<Grid
					container
					direction='column'
					justify='flex-start'
					alignItems='flex-start'
				>
					<StudentList></StudentList>
				</Grid>
			</Grid>
		</Grid>
	);
};

function StudentList() {
	const [columnHeaders, setColumnHeaders] = useState([]);
	const method = async () => {
		const result = await getStudentColumnNames();
		setColumnHeaders(result);
	};

	method();

	return (
		<TableContainer>
			<Table size='small'>
				<StudentTableHead columnHeaders={columnHeaders}></StudentTableHead>
				<StudentTableBody columnHeaders={columnHeaders}></StudentTableBody>
			</Table>
		</TableContainer>
	);
}

function StudentTableBody({ columnHeaders }) {
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		const addTableData = async () => {
			setTableData(await getStudentData());
		};

		addTableData();
	}, []);

	return (
		<TableBody>
			{tableData.length === 0 ? (
				<TableRow>
					<TableCell colSpan={columnHeaders.length} align='center'>
						No data found.
					</TableCell>
				</TableRow>
			) : (
				tableData.map(i => (
					<TableRow key={i.studentId}>
						{Object.values(i).map(val => (
							<TableCell>{val}</TableCell>
						))}
					</TableRow>
				))
			)}
		</TableBody>
	);
}

function StudentTableHead({ columnHeaders }) {
	return (
		<TableHead>
			<TableRow>
				{columnHeaders.map(i => (
					<TableCell key={i} size='small' padding='none'>
						<TableSortLabel>{startCase(i)}</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
