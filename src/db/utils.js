import { database } from '../../package.json';
import {  snakeCase, compact, lowerCase, camelCase } from 'lodash';

export async function getColumnNames(tableName) {
	let columnData = [];

	const sqlite3 = window.require('sqlite3').verbose();
	const db = new sqlite3.Database(database);

	const promise = new Promise((res, rej) => {
		db.serialize(() => {
			const statement = `PRAGMA table_info(${tableName})`
			// logger.info(`Getting data wth statement ${statement}`);

			db.all(statement, (err, rows) => {
				columnData = rows.map(i => i.name);
				res(columnData);
			});
		});
		db.close();
	});

	return promise;
}

export function jsonToStatementObject(obj) {
	return Object.fromEntries(
		Object.entries(obj).map(([key, val]) => [`$${key}`, val]),
	);
}

export function getStatementColRefs(obj) {
	return Object.keys(obj)
		.map(i => `$${i}`)
		.join(',');
}

export function objectKeysToSnakeCaseString(obj) {
	return Object.keys(obj)
		.map(i => snakeCase(i))
		.join(',');
}

export function objectToUpdateStatement(obj, tableName, primaryKeyName = `${tableName}_id`) {
	const setConditions = compact(
		Object.entries(obj).map(([key, val]) => {
			if (lowerCase(key) !== lowerCase(primaryKeyName))
				return `${snakeCase(key)}=$${key}`;
			return null;
		}),
	).join(',');

	return `
		UPDATE ${tableName}
		SET 
			${setConditions}
		WHERE
			${primaryKeyName}=$${camelCase(primaryKeyName)}
	`;
}


export function objectToInsertStatement(obj, tableName){
	const columns = objectKeysToSnakeCaseString(obj);
	const statementColRefs = getStatementColRefs(obj);
	let statement = `INSERT INTO ${tableName} (${columns})
					VALUES (${statementColRefs})`
	return statement;
}