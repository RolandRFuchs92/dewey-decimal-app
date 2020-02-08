import {
	getColumnNames,
	jsonToStatementObject,
	getStatementColRefs,
	objectKeysToSnakeCaseString,
	objectToUpdateStatement,
} from '../../db/utils';
import { snakeCase } from 'lodash';
import {getDatabase} from 'db/utils';
import {all, run} from 'db/repo';

const tableName = 'student';

const createStudentTable = `CREATE TABLE IF NOT EXISTS ${tableName} ( 
	${tableName}_id INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	birthdate TEXT NOT NULL,
	mother_name text,
	mother_mobile TEXT,
	mother_email TEXT,
	father_name TEXT,
	father_mobile TEXT,
	father_email TEXT,
	class_id INTEGER NOT NULL,
	is_active INTEGER NOT NULL,
	CONSTRAINT fk_class_id FOREIGN KEY(class_id) REFERENCES class(class_id)
);`;

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

export const getStudentColumnNames = async () => {
	return await getColumnNames(tableName);
};

export async function getStudentData() {
	return all(queryGetAllStudents);
}

export function ensureCreated() {
	run(createStudentTable);
}

export async function addOrUpdateStudent(student) {
	debugger;
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
