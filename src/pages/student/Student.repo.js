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

export const getStudentColumnNames = async () => {
	return await getColumnNames(tableName);
};

export async function getStudentData() {
	return all('SELECT * FROM student');
}

export function ensureCreated() {
	run(createStudentTable);
}

export function addOrUpdateStudent(student) {
	if (student.studentId) return updateStudent(student);
	else return addStudent(student);
}

function addStudent(student) {
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
