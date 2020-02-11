import React, { useState, useEffect } from 'react';
import { startCase, lowerCase } from 'lodash';
import MUIDataTable from 'mui-datatables';

import {
	getStudentColumnNames,
	getStudentData,
	hideStudent,
} from './Student.repo';
import EditDeleteCol, { useAddButton } from 'utils/tableButtons';
import { useDialog } from 'utils/dialog';
import { useAlert } from 'utils/snackbarAlerts';

import StudentModal from './Student.modal';

export default function() {
	const [columns, setColumns] = useState([]);
	const [options, setOptions] = useState({});
	const [data, setData] = useState([]);
	const [student, setStudent] = useState({});
	const [isOpen, setIsOpen] = useState(false);
	const dialog = useDialog();
	const alert = useAlert();
	let columnVar;

	const handleEditAdd = rowData => {
		const obj = Object.fromEntries(
			columnVar.map(({ name }, index) => [name, rowData[index]]),
		);
		setStudent(obj);
		setIsOpen(true);
	};

	const addButton = useAddButton(handleEditAdd);

	useEffect(() => {
		(async () => {
			const columnText = (await getStudentColumnNames()).map(({ name }) => ({
				name,
				label: startCase(lowerCase(name)),
			}));

			const cols = [
				...columnText,
				...EditDeleteCol(handleEditAdd, handleDeleteClick),
			];
			columnVar = cols;
			setColumns(cols);
			resetStudentList();
			setOptions({
				selectableRows: 'none',
				...addButton,
			});
		})();
	}, []);

	const resetStudentList = async () => {
		const studentData = await getStudentData();
		setData(studentData);
		setIsOpen(false);
	};
	const handleClose = () => {
		setIsOpen(false);
	};

	const handleDeleteClick = rowData => {
		const selectedStudent = Object.fromEntries(
			columnVar.map(({ name }, index) => [name, rowData[index]]),
		);
		dialog({
			title: 'Are you sure?',
			description: `Really delete ${selectedStudent.first_name} ${selectedStudent.last_name}?`,
			handleYes: () => handleYesForDelete(selectedStudent),
		});
	};

	const handleYesForDelete = async student => {
		const studentName = `${student.first_name} ${student.last_name}`;
		try {
			await hideStudent(student.student_id);
			await resetStudentList();
			alert.success(`Successfully deleted ${studentName}`);
		} catch (e) {
			alert.error(`There was an error deleteing ${studentName}.`);
		}
	};

	return (
		<>
			<MUIDataTable
				options={options}
				title={'Student List'}
				data={data}
				columns={columns}
			></MUIDataTable>
			<StudentModal
				{...{ isOpen, student, handleClose, reset: resetStudentList }}
			></StudentModal>
		</>
	);
}
