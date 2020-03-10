import { snakeCase, compact, lowerCase } from "lodash";
import { all, run } from "db/repo";
import log from "utils/logger";

const getColumnsStatement = tableName => `PRAGMA table_info(${tableName})`;
const getTablesStatement = `
	SELECT
		name
	FROM 
		sqlite_master
	WHERE
		type='table'
`;

export async function getColumnNames(tableName) {
  try {
    const columnStatement = getColumnsStatement(tableName);
    return await all(columnStatement);
  } catch (e) {
    throw e;
  }
}

export function jsonToStatementObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [`$${key}`, val])
  );
}

export function getStatementColRefs(obj) {
  return Object.keys(obj)
    .map(i => `$${i}`)
    .join(",");
}

export function objectKeysToSnakeCaseString(obj) {
  return Object.keys(obj)
    .map(i => snakeCase(i))
    .join(",");
}

export function objectToUpdateStatement(
  obj,
  tableName,
  primaryKeyName = `${tableName}_id`
) {
  const setConditions = compact(
    Object.entries(obj).map(([key, val]) => {
      if (lowerCase(key) !== lowerCase(primaryKeyName))
        return `${snakeCase(key)}=$${snakeCase(key)}`;
      return null;
    })
  ).join(",");

  return `
		UPDATE ${tableName}
		SET 
			${setConditions}
		WHERE
			${primaryKeyName}=$${snakeCase(primaryKeyName)}
	`;
}

export function objectToInsertStatement(obj, tableName) {
  const columns = objectKeysToSnakeCaseString(obj);
  const statementColRefs = getStatementColRefs(obj);
  let statement = `INSERT INTO ${tableName} (${columns})
					VALUES (${statementColRefs})`;
  return statement;
}

export async function getAllTablesInDb() {
  return await all(getTablesStatement);
}

export async function addOrUpdate(
  object,
  tableName,
  pkField = `${tableName}_id`
) {
  object.Edit && delete object.Edit;
  object.Delete && delete object.Delete;
  if (!object[pkField]) {
    object[pkField] === "" && delete object[pkField];
    await addToDb(object, tableName);
    return "add";
  }
  await updateDb(object, tableName, pkField);
  return "update";
}

export async function addToDb(object, tableName) {
  const statement = objectToInsertStatement(object, tableName);
  const statementObject = jsonToStatementObject(object);

  log.info("Running generic addToDb statement.");
  return await run(statement, statementObject);
}

export async function updateDb(object, tableName, pkField = `${tableName}_id`) {
  const statement = objectToUpdateStatement(object, tableName, pkField);
  const statementObject = jsonToStatementObject(object);

  log.info("Running generic updateDb statement.");
  return await run(statement, statementObject);
}

export async function getAll(tableName, where = "") {
  const statement = `
		SELECT
			*
		FROM
			${tableName}
		${where}
	`;
  log.info(`Running generic select statement.`);
  return await all(statement);
}

export function deleteRow(tableName, pkField) {
  const buildStatement = `
		DELETE
		FROM
			${tableName}
		WHERE
			${pkField}=
	`;

  return async id => {
    const statement = `${buildStatement}${id}`;
    log.info(`Running generic DELETE statement.`);
    return await run(statement);
  };
}

export async function hideRow() {}
