import { run, all } from 'db/repo';
import {
  objectToUpdateStatement,
  objectToInsertStatement,
  jsonToStatementObject
} from 'db/utils';
import { isNil } from 'lodash';
import { DropdownListModel } from 'types/generic.type';

import {
  queryGetClasses,
  queryHideClass,
  getSelectListQuery
} from './Class.sql';
import { ClassSchema, TableClassSchema } from './Class.type';

export async function getClasses() {
  const classes = await all<TableClassSchema>(queryGetClasses);
  return classes;
}

export async function addOrUpdateClass(classObj: ClassSchema) {
  if (isNil(classObj.class_id)) {
    await addClass(classObj);
    return 'add';
  }
  await updateClass(classObj);
  return 'update';
}

async function addClass(classObj: ClassSchema) {
  const statement = objectToInsertStatement(classObj, 'class');
  const statementObj = jsonToStatementObject(classObj);
  return run(statement, statementObj);
}

async function updateClass(classObj: ClassSchema) {
  const statement = objectToUpdateStatement(classObj, 'class');
  const statementObj = jsonToStatementObject(classObj);
  return run(statement, statementObj);
}

export async function hideClass(classId: number) {
  const statementObject = { $class_id: classId };
  const statement = queryHideClass;
  return await run(statement, statementObject);
}

export async function getSelectList() {
  return await all<DropdownListModel>(getSelectListQuery);
}
