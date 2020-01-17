import React, { useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { startCase, lowerCase, camelCase } from 'lodash';

import { getStudentColumnNames, getStudentData } from './Student.repo';
import MUIDataTable from 'mui-datatables';

const useStyles = makeStyles(theme => ({
	studentList: {},
}));

let data, setData;

export default function StudentList({
	setStudent,
	studentData,
	setStudentData,
}) {
	data = studentData;
	setData = setStudentData;

	return (
		<Grid
			container
			direction='column'
			justify='flex-start'
			alignItems='flex-start'
		>
			<NewStudentList setStudent={setStudent}></NewStudentList>
		</Grid>
	);
}

function NewStudentList({ setStudent }) {
	const [columns, setColumns] = useState([]);
	const [options, setOptions] = useState({});
	const classes = useStyles();

	useEffect(() => {
		const method = async () => {
			const columnText = (await getStudentColumnNames()).map(i => ({
				name: i,
				label: startCase(lowerCase(i)),
			}));
			setColumns(columnText);

			const studentData = await getStudentData();
			setData(studentData);
		};

		method();
	}, []);

	useEffect(() => {
		setOptions({
			selectableRows: 'none',
			onRowClick: rowData => {
				const newStudent = Object.fromEntries(
					Object.entries(rowData).map(([key, val]) => {
						return [camelCase(columns[parseInt(key)].name), val];
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
