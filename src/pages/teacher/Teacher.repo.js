import { getDatabase } from 'db/utils';

const queryEnsureCreatedScript = `CREATE TABLE IF NOT EXISTS teacher (
	teacher_id INTEGER PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	mobile TEXT,
	email TEXT,
	class_id INTEGER
)
`;

const querySelectListTeachers = `
    SELECT
        teacher_id,
        first_name,
`;

export async function getTeachersForSelect(){
    const db = getDatabase();
    let result;
    
    db.run();


    db.close();
}