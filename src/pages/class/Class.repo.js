import {run, all} from 'db/repo';
import {objectToUpdateStatement, objectToInsertStatement, jsonToStatementObject} from 'db/utils';
import { isNil } from 'lodash';

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
        WHERE 
            is_active = 1
`

const queryHideClass = `
        UPDATE 
            class 
        SET 
            is_active = 0
        WHERE
            class_id=$class_id
        
`

export async function ensureCreated() {
    return await run(queryEnsureClassCreated);    
}

export async function getClasses(){
    const classes = await all(queryGetClasses);
    return classes;
}

export async function addOrUpdateClass(classObj){
    if(isNil(classObj.class_id))
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

export async function hideClass(classId){
    const statementObject = {$class_id: classId};
    const statement = queryHideClass;
    return await run(statement, statementObject)
}