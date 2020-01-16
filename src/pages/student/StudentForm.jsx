import React, { useState, useEffect } from 'react';
import { startCase, camelCase } from 'lodash';
import { TextField, makeStyles, Grid, Paper } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { getStudentColumnNames, getStudentData } from './Student.repo';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	studentList: {
		width: 600,
	},
}));

export default () => {
	const [student, setStudent] = useState({});

	const handleChange = ({ target: { name, value } }) => {
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
						<FormRow label='Class' name='classId'></FormRow>
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
					<NewStudentList setStudent={setStudent}></NewStudentList>
				</Grid>
			</Grid>
		</Grid>
	);
};

function NewStudentList({ setStudent }) {
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [options, setOptions] = useState({});
	const classes = useStyles();

	useEffect(() => {
		const method = async () => {
			setColumns(await getStudentColumnNames());
			setData(await getStudentData());
		};

		method();
	}, []);

	useEffect(() => {
		setOptions({
			selectableRows: 'none',
			onRowClick: rowData => {
				const newStudent = Object.fromEntries(
					Object.entries(rowData).map(([key, val]) => {
						return [camelCase(columns[parseInt(key)]), val];
					}),
				);
				setStudent({ ...newStudent });
			},
		});
	}, [columns, setStudent]);

	return (
		<MUIDataTable
			className={classes.studentList}
			options={options}
			title={'Student List'}
			data={data}
			columns={columns}
		></MUIDataTable>
	);
}
