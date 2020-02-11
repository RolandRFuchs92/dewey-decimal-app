import { 
    objectToUpdateStatement, 
    objectToInsertStatement, 
    jsonToStatementObject 
} from 'db/utils';
import { run, all } from '../../db/repo';

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
    delete teacher.Delete;
    delete teacher.Edit;
    if(teacher.teacher_id){
         await updateTeacher(teacher);
         return 'add';
    }
    await createTeacher(teacher);
    return 'update'
}

export async function updateTeacher(teacher){
    const statement = objectToUpdateStatement(teacher, 'teacher');
    const statementObject = jsonToStatementObject(teacher);

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