import {
	getColumnNames,
	jsonToStatementObject,
	getStatementColRefs,
	objectKeysToSnakeCaseString,
	objectToUpdateStatement,
} from '../../db/utils';
import { startCase, snakeCase } from 'lodash';

import appSettings from 'appSettings';
import {getDatabase} from 'db/utils';
import {all, run} from 'db/repo';

const tableName = 'student';

const queryHideStudent = `
	UPDATE 
		student
	SET
		is_active = 0
	WHERE
		student_id=$student_id;
`;

const queryGetAllStudents = `
	SELECT
		*
	FROM 
		student s
	WHERE
		s.is_active = 1;
`;

const queryStudentDropdown = `
	SELECT
		${appSettings.tables.student.pk},
		first_name,
		last_name,
		class_name, 
		grade
	FROM
		student s
	JOIN
		class c
		ON s.class_id = c.class_id
	WHERE
		s.is_active = 1
		AND c.is_active = 1
`;

export const getStudentColumnNames = async () => {
	return await getColumnNames(tableName);
};

export async function getStudentData() {
	return all(queryGetAllStudents);
}

export async function addOrUpdateStudent(student) {
	delete student.Edit;
	delete student.Delete;
	if (student.student_id) {
		await updateStudent(student);
		return 'update'
	}
	await addStudent(student);
	return 'add';
}

export async function hideStudent($student_id){
	return run(queryHideStudent, $student_id);
}

function addStudent(student) {
	student.is_active = 1;
	const cols = objectKeysToSnakeCaseString(student);
	const colRefs = getStatementColRefs(student);
	const statement = `
		INSERT INTO ${tableName} (${cols})
		VALUES (${colRefs})
	`;

	const studentModel = jsonToStatementObject(student);
	return run(statement, studentModel);
}

async function updateStudent(student) {
	const statement = objectToUpdateStatement(student, tableName);
	const studentModel = jsonToStatementObject(student);

	return run(statement, studentModel);
}


export async function getStudentSelectList() {
	const data = await all(queryStudentDropdown);
	return data.map(({[appSettings.tables.student.pk]: pk,first_name, last_name, class_name, grade}) => {
		return {
			value: pk,
			text: `${startCase(first_name)} ${last_name} - Grade ${grade}${startCase(class_name.substr(0,2))}`
		}
	});
}