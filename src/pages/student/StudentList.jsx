import React, { useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { startCase, lowerCase } from 'lodash';
import MUIDataTable from 'mui-datatables';

import { getStudentColumnNames, getStudentData } from './Student.repo';
import EditDeleteCol, {useAddButton} from 'utils/tableButtons';
import { useDialog } from 'utils/dialog';

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
	const dialog = useDialog();
	let columnVar;
	const handleEditAdd = (rowData) => {
		const obj = Object.fromEntries(columns().map(({name}, index) => [name,rowData[index]]));
		setStudent(obj);
	}
	const addButton = useAddButton(handleEditAdd);

	useEffect(() => {
		(async () => {
			const columnText = (await getStudentColumnNames()).map(({ name }) => ({
				name,
				label: startCase(lowerCase(name)),
			}));
		
			const cols = [...columnText, ...(EditDeleteCol(() => {}, handleDeleteClick))];
			columnVar = cols;
			setColumns(cols);
			const studentData = await getStudentData();
			setData(studentData);
		})();
	}, []);

	useEffect(() => {
		setOptions({
			selectableRows: 'none',
			...(addButton)
		});
	}, [columns, setStudent]);

	const handleDeleteClick = rowData => {
		const obj = Object.fromEntries(columnVar.map(({name}, index) => [name,rowData[index]]));
		debugger;
		dialog({ title: 'Are you sure?', description: `Really delete ${obj.first_name} ${obj.last_name}?`, handleYes: () => handleYesForDelete(obj.student_id) })
	}

	const handleYesForDelete = student_id => {

	}

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
