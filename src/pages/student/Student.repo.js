const createStudentTable = `CREATE TABLE student (
	student_id INTEGER,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	mobile_number TEXT,
	class_id INTEGER NOT NULL
);`;

export function ensureCreated() {
	const sqlite3 = window.require('sqlite3').verbose();
	const db = new sqlite3.Database('willy');

	db.serialize(() => {
		db.run(createStudentTable);
	});

	db.close();
}
