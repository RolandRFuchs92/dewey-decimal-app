import {
  objectToUpdateStatement,
  objectToInsertStatement,
  jsonToStatementObject
} from 'db/utils';
import { run, all } from 'db/repo';
import { DataTableDataModel } from 'components/page/PageBase.type';
import { JsonObj } from 'types/generic.type';

import {
  querySelectListTeachers,
  queryAllTeachers,
  queryHideTeacher
} from './Teacher.sql';
import {
  TableTeacherSchema,
  TeacherRepoModel,
  TeacherSchema
} from './Teacher.type';

export async function getTeachersForSelect() {
  return all<TeacherRepoModel>(querySelectListTeachers);
}

export async function getTeachers() {
  return all<TableTeacherSchema>(queryAllTeachers);
}

export async function createOrUpdateTeacher(teacher: TeacherSchema) {
  if (teacher.teacher_id) {
    await updateTeacher(teacher);
    return 'added';
  }
  await createTeacher(teacher);
  return 'updated';
}

export async function updateTeacher(teacher: TeacherSchema) {
  const statement = objectToUpdateStatement(teacher, 'teacher');
  const statementObject = jsonToStatementObject(teacher);

  return run(statement, statementObject);
}

export async function createTeacher(teacher: TeacherSchema) {
  teacher.is_active = true;
  const statement = objectToInsertStatement(teacher, 'teacher');
  const statementObject = jsonToStatementObject(teacher);

  return run(statement, statementObject);
}

export async function deleteTeacher(teacherId: number) {
  const statement = queryHideTeacher;
  const statementObject = { $teacher_id: teacherId };
  return run(statement, (statementObject as unknown) as JsonObj);
}
