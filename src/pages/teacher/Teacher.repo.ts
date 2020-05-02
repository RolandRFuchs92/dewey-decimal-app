import {
  objectToUpdateStatement,
  objectToInsertStatement,
  jsonToStatementObject
} from 'db/utils';
import { run, all } from 'db/repo';
import { DatatabelDataModel } from 'components/page/PageBase.type';
import { JsonObj } from 'types/generic.type';

import {
  querySelectListTeachers,
  queryAllTeachers,
  queryHideTeacher
} from './Teacher.sql';
import { TableTeacherSchema } from './Teacher.type';

export async function getTeachersForSelect() {
  return all<TeacherRepoModel>(querySelectListTeachers);
}

export async function getTeachers() {
  return all<TableTeacherSchema>(queryAllTeachers);
}

export type TeacherRepoModel = {
  teacher_id: string;
  is_active: boolean | 0 | 1;
};

export async function createOrUpdateTeacher(
  teacher: DatatabelDataModel<TeacherRepoModel>
) {
  delete teacher.Delete;
  delete teacher.Edit;
  if (teacher.teacher_id) {
    await updateTeacher(teacher);
    return 'add';
  }
  await createTeacher(teacher);
  return 'update';
}

export async function updateTeacher(teacher: TeacherRepoModel) {
  const statement = objectToUpdateStatement(teacher, 'teacher');
  const statementObject = jsonToStatementObject(teacher);

  return run(statement, statementObject);
}

export async function createTeacher(teacher: TeacherRepoModel) {
  teacher.is_active = 1;
  const statement = objectToInsertStatement(teacher, 'teacher');
  const statementObject = jsonToStatementObject(teacher);

  return run(statement, statementObject);
}

export async function hideTeacher(teacherId: number) {
  const statement = queryHideTeacher;
  const statementObject = { $teacher_id: teacherId };
  return run(statement, (statementObject as unknown) as JsonObj);
}
