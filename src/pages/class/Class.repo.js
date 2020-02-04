import {run, all} from 'db/repo';
import {objectToUpdateStatement, objectToInsertStatement, jsonToStatementObject} from 'db/utils';

const queryEnsureClassCreated = `
    CREATE TABLE IF NOT EXISTS class(
        class_id INTEGER PRIMARY KEY,
        class_name TEXT,
        grade INTEGER,
        is_active INTEGER
    )
`;

const queryGetClasses = `
        SELECT 
            * 
        FROM 
            class
`

export async function ensureCreated() {
    return await run(queryEnsureClassCreated);    
}

export async function getClasses(){
    return await all(queryGetClasses);
}

export async function addOrUpdateClass(classObj){
    if(classObj.class_id)
        return await addClass(classObj);
    return await updateClass(classObj);
}

async function addClass(classObj){ 
    const statement = objectToInsertStatement(classObj,'class');
    const statementObj = jsonToStatementObject(classObj);
    return run(statement, statementObj);
}

async function updateClass(classObj){
    const statement = objectToUpdateStatement(classObj,'class');
    const statementObj = jsonToStatementObject(classObj);
    return run(statement, statementObj);
}