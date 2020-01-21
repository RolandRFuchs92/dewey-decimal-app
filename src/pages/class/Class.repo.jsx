import {getDatabase} from 'db/utils';

const queryEnsureClassCreated = `
    CREATE TABLE IF NOT EXISTS class(
        class_id INTEGER PRIMARY KEY,
        class_name TEXT,
        grade INTEGER,
    )
`;

export async function ensureCreated() {
    const db = getDatabase();

    return new Primise((res, rej) => {
        db.run(queryEnsureClassCreated, (err) => {
            if(err)
                rej(err);
            
            res('Created class table');
        });
    
        db.close();
    });
    
}