import { getDatabase } from 'db/utils';

const queryEnsureCreatedScript = `CREATE TABLE IF NOT EXISTS teacher (
	teacher_id INTEGER PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	mobile TEXT,
	email TEXT,
    class_id INTEGER,
    is_active INTEGER
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

export async function getTeachersForSelect(){
    const db = getDatabase();
    return new Promise((res, rej) => {
        db.all(querySelectListTeachers,(err, rows) => {
            db.close();
            if(err)
                return rej(err);
            return res(rows)
        });
    })
}

export async function getTeachers() {
    const db = getDatabase();

    return new Promise((res, rej) => {
        db.all(queryAllTeachers,(err, rows) => {
            db.close();
            if(err)
                return rej(err);
            return res(rows)
        });
    });
}