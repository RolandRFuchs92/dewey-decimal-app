import { snakeCase, compact, lowerCase } from 'lodash';
import { all, run } from 'db/repo';
// import log from 'utils/logger';

export function jsonToStatementObject(obj: object) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [`$${key}`, val])
  );
}

export function getStatementColRefs(obj: object) {
  return Object.keys(obj)
    .map(i => `$${i}`)
    .join(',');
}

export function objectKeysToSnakeCaseString(obj: object) {
  return Object.keys(obj)
    .map(i => snakeCase(i))
    .join(',');
}

export function objectToUpdateStatement(
  obj: object,
  tableName: string,
  primaryKeyName: string = `${tableName}_id`
) {
  const setConditions = compact(
    Object.entries(obj).map(([key, val]) => {
      if (lowerCase(key) !== lowerCase(primaryKeyName))
        return `${snakeCase(key)}=$${snakeCase(key)}`;
      return null;
    })
  ).join(',');

  return `
		UPDATE ${tableName}
		SET 
			${setConditions}
		WHERE
			${primaryKeyName}=$${snakeCase(primaryKeyName)}
	`;
}

export function objectToInsertStatement(obj: object, tableName: string) {
  const columns = objectKeysToSnakeCaseString(obj);
  const statementColRefs = getStatementColRefs(obj);
  let statement = `INSERT INTO ${tableName} (${columns})
					VALUES (${statementColRefs})`;
  return statement;
}

export async function addOrUpdate(
  object: { Edit?: any; Delete?: any; [key: string]: any },
  tableName: string,
  pkField: string = `${tableName}_id`
) {
  delete object['Edit'];
  delete object['Delete'];

  // log.info(
  //   `Running addOrUpdate on ${tableName} with params ${JSON.stringify(object)}`
  // );
  if (!object[pkField]) {
    object[pkField] === '' && delete object[pkField];
    await addToDb(object, tableName);
    return 'added';
  }
  await updateDb(object, tableName, pkField);
  return 'updated';
}

export async function addToDb(object: object, tableName: string) {
  const statement = objectToInsertStatement(object, tableName);
  const statementObject = jsonToStatementObject(object);

  // log.info('Running generic addToDb statement.');
  return await run(statement, statementObject);
}

export async function updateDb(
  object: object,
  tableName: string,
  pkField: string = `${tableName}_id`
) {
  const statement = objectToUpdateStatement(object, tableName, pkField);
  const statementObject = jsonToStatementObject(object);

  // log.info('Running generic updateDb statement.');
  return await run(statement, statementObject);
}

export async function getAll<T>(
  tableName: string,
  where: string = ''
): Promise<T[]> {
  const statement = `
		SELECT
			*
		FROM
			${tableName}
		${where}
	`;
  // log.info(`Running generic select statement.`);
  return await all(statement);
}

export function deleteRow(tableName: string, pkField: string) {
  const buildStatement = `
		DELETE
		FROM
			${tableName}
		WHERE
			${pkField}=
	`;

  return async (id: string) => {
    const statement = `${buildStatement}${id}`;
    // log.info(`Running generic DELETE statement.`);
    return await run(statement);
  };
}

export async function hideRow() {}
