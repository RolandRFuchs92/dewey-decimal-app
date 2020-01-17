import { database } from '../../../package.json';
import {
	getColumnNames,
	jsonToStatementObject,
	getStatementColRefs,
	objectKeysToSnakeCaseString,
	objectToUpdateStatement,
} from '../../db/utils';
import { snakeCase } from 'lodash';

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
	class_id INTEGER NOT NULL
);`;

export const getStudentColumnNames = async () => {
	return await getColumnNames(tableName);
};

export async function getStudentData() {
	const sqlite3 = window.require('sqlite3').verbose();
	const db = new sqlite3.Database(database);

	const promise = new Promise((res, rej) => {
		db.all('SELECT * FROM student', (err, rows) => {
			rows.length && res(rows.map(i => i));
			res([]);
		});
	});
	return promise;
}

export function ensureCreated() {
	const sqlite3 = window.require('sqlite3').verbose();
	const db = new sqlite3.Database(database);

	db.serialize(() => {
		db.run(createStudentTable);
	});

	db.close();
}

export function addOrUpdateStudent(student) {
	if (student.studentId) return updateStudent(student);
	else return addStudent(student);
}

function addStudent(student) {
	const sqlite3 = window.require('sqlite3').verbose();
	const db = new sqlite3.Database(database);

	const cols = objectKeysToSnakeCaseString(student);
	const colRefs = getStatementColRefs(student);
	const statement = `
		INSERT INTO ${tableName} (${cols})
		VALUES (${colRefs})
	`;

	const studentModel = jsonToStatementObject(student);

	const promise = new Promise((res, rej) => {
		db.run(statement, studentModel, err => {
			if (err === null) res('success');
			rej(err);
		});
	});

	return promise;
}

async function updateStudent(student) {
	const sqlite3 = window.require('sqlite3').verbose();
	const db = new sqlite3.Database(database);

	const statement = objectToUpdateStatement(student, tableName);
	const studentModel = jsonToStatementObject(student);

	const promise = new Promise((res, rej) => {
		db.run(statement, studentModel, err => {
			if (err === null) res('success');
			rej(err);
		});
	});

	return promise;
}
