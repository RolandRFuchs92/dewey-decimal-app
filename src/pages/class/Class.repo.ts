import { run, all } from 'db/repo';
import {
  objectToUpdateStatement,
  objectToInsertStatement,
  jsonToStatementObject
} from 'db/utils';
import { isNil } from 'lodash';
import { DropdownListModel } from 'types/Generic';

export async function getClasses() {
  const classes = await all(queryGetClasses);
  return classes;
}

export async function addOrUpdateClass(classObj) {
  if (isNil(classObj.class_id)) {
    await addClass(classObj);
    return 'add';
  }
  await updateClass(classObj);
  return 'update';
}

async function addClass(classObj) {
  const statement = objectToInsertStatement(classObj, 'class');
  const statementObj = jsonToStatementObject(classObj);
  return run(statement, statementObj);
}

async function updateClass(classObj) {
  const statement = objectToUpdateStatement(classObj, 'class');
  const statementObj = jsonToStatementObject(classObj);
  return run(statement, statementObj);
}

export async function hideClass(classId) {
  const statementObject = { $class_id: classId };
  const statement = queryHideClass;
  return await run(statement, statementObject);
}

export async function getSelectList() {
  return await all<DropdownListModel>(getSelectListQuery);
}
