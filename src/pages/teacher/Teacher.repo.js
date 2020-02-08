import { getDatabase, objectToUpdateStatement, objectToInsertStatement, jsonToStatementObject } from 'db/utils';
import { run, all } from '../../db/repo';

const queryEnsureCreatedScript = `CREATE TABLE IF NOT EXISTS teacher (
	teacher_id INTEGER PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	mobile TEXT,
	email TEXT,
    class_id INTEGER,
    is_active INTEGER,
    CONSTRAINT fk_class_id FOREIGN KEY(class_id) REFERENCES class(class_id)
)
`;

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
`
const queryHideTeacher = `
    UPDATE 
        teacher
    SET
        is_active = 0
    WHERE
        teacher_id = $teacher_id
`;


export async function getTeachersForSelect(){
    return all(querySelectListTeachers);
}

export async function getTeachers() {
   return all(queryAllTeachers);
}

export async function createOrUpdateTeacher(teacher){
    if(teacher.teacher_id)
        return updateTeacher(teacher);
    return createTeacher(teacher);
}

export async function updateTeacher(teacher){
    const statement = objectToUpdateStatement(teacher);
    const statementObject = objectToUpdateStatement(teacher);

    return run(statement, statementObject);
}

export async function createTeacher(teacher) {
    teacher.is_active = 1;
    const statement = objectToInsertStatement(teacher, 'teacher');
    const statementObject = jsonToStatementObject(teacher);

    return run(statement, statementObject);
}

export async function hideTeacher(teacherId) {
    const statement = queryHideTeacher;
    const statementObject = {$teacher_id: teacherId}
    return run(statement, statementObject);
}