import {  snakeCase, compact, lowerCase, camelCase } from 'lodash';
import { all, run } from 'db/repo';
import log from 'utils/logger';

const getColumnsStatement = tableName => `PRAGMA table_info(${tableName})`;
const getTablesStatement = `
	SELECT
		name
	FROM 
		sqlite_master
	WHERE
		type='table'
`

export async function getColumnNames(tableName) {
	try{
		const columnStatement = getColumnsStatement(tableName);
		return await all(columnStatement);
	} catch(e) {
		throw e;
	}
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
				return `${snakeCase(key)}=$${snakeCase(key)}`;
			return null;
		}),
	).join(',');

	return `
		UPDATE ${tableName}
		SET 
			${setConditions}
		WHERE
			${primaryKeyName}=$${snakeCase(primaryKeyName)}
	`;
}


export function objectToInsertStatement(obj, tableName){
	const columns = objectKeysToSnakeCaseString(obj);
	const statementColRefs = getStatementColRefs(obj);
	let statement = `INSERT INTO ${tableName} (${columns})
					VALUES (${statementColRefs})`
	return statement;
}

export async function getAllTablesInDb(){
	return await all(getTablesStatement);
}

/**
 * Generic add or update.
 * @param {json} object 
 * @param {string} tableName
 * @param {string} pkField 
 */
export async function addOrUpdate(object, tableName, pkField =`${tableName}_id`) {
	object.Edit && delete object.Edit;
	object.Delete && delete object.Delete;
	if(object[pkField]){ 
		await updateDb(object, tableName, pkField);
		return 'update';
	}

	await addToDb(object, tableName);
	return 'add'
}

export async function addToDb(object, tableName) {
	const statement = objectToInsertStatement(object, tableName);
	const statementObject = jsonToStatementObject(object);

	log.info('Running generic addToDb command.');
	return await run(statement, statementObject)
}

export async function updateDb(object, tableName, pkField = `${tableName}_id`){
	const statement = objectToUpdateStatement(object, tableName, pkField);
	const statementObject = jsonToStatementObject(object);

	log.info('Running generic updateDb command.');
	return await run(statement, statementObject);
}