import {database} from '../../../package.json';
import { GetColumnNames } from '../../db/utils';

const createStudentTable = `CREATE TABLE IF NOT EXISTS student ( 
	student_id INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	birthdate TEXT NOT NULL,
	year_started_primary_school INT NOT NULL,
	current_grade INT,
	mother_name text,
	mother_mobile TEXT,
	mother_email TEXT,
	father_name TEXT,
	father_mobile TEXT,
	father_email TEXT,
	class_id INTEGER NOT NULL
);`;

export const getStudentColumnNames = () => {
	return GetColumnNames('student');
}

export function ensureCreated() {
	const sqlite3 = window.require('sqlite3').verbose();
	const db = new sqlite3.Database(database);

	db.serialize(() => {
		db.run(createStudentTable);
	});

	db.close();
}
