import {
  objectToUpdateStatement,
  objectToInsertStatement,
  jsonToStatementObject
} from 'db/utils';
import { run, all } from '../../db/repo';
import { DatatabelDataModel } from 'components/page/PageBase.type';
import { JsonObj } from 'types/Generic';

const querySelectListTeachers = `
    SELECT
        teacher_id,
        first_name
    FROM
        teacher
    WHERE
        is_active = 1
    ORDER BY 
        teacher_id ASC
`;

const queryAllTeachers = `
    SELECT
        teacher_id,
        first_name,
        last_name,
        mobile,
        email,
        class_id,
        is_active
    FROM
        teacher
    WHERE
        is_active = 1;
`;
const queryHideTeacher = `
    UPDATE 
        teacher
    SET
        is_active = 0
    WHERE
        teacher_id = $teacher_id
`;

export async function getTeachersForSelect() {
  return all(querySelectListTeachers);
}

export async function getTeachers(): Promise<TeacherModel[]> {
  return all(queryAllTeachers);
}

export type TeacherModel = {
  teacher_id: string;
  is_active: boolean | 0 | 1;
};

export async function createOrUpdateTeacher(
  teacher: DatatabelDataModel<TeacherModel>
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

export async function updateTeacher(teacher: TeacherModel) {
  const statement = objectToUpdateStatement(teacher, 'teacher');
  const statementObject = jsonToStatementObject(teacher);

  return run(statement, statementObject);
}

export async function createTeacher(teacher: TeacherModel) {
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
