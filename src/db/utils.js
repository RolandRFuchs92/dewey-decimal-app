import { database } from '../../package.json';

export async function getColumnNames(tableName) {
	let columnData = [];

	const sqlite3 = window.require('sqlite3').verbose();
	const db = new sqlite3.Database(database);

	const promise = new Promise((res, rej) => {
		db.serialize(() => {
			db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
				columnData = rows.map(i => i.name);
				res(columnData);
			});
		});
		db.close();
	});

	return promise;
}
