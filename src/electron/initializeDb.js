import { endsWith } from 'lodash';

import { loadSingleFileFromDbFolder, getAllFilesInFolder } from 'utils/sqlScriptLoader';
import { run } from 'db/repo';
import { getAllTablesInDb } from 'db/utils'; 
import appSettings from 'appSettings.js';
import log from 'utils/logger';
import { all } from '../db/repo';

const deweySummary1Name = `dewey_summary`;
const deweySummary2Name = `dewey_summary_2`;
const deweySummary3Name = `dewey_summary_3`;
const tableHasDataQuery = table => `
    SELECT
        *
    FROM
        ${table}
    LIMMIT 1;
`;

export default async () => {
    try{
      
        await seedDeweyData();
    } catch(error){
        log.error(`There was an error Seeding the dewey database.`);
    }
}

export async function setupDatabase(){
    try {
        await createDatabase();
        await seedDatabase();
    } catch (error) {
    }
}

const dewey = 'deweySystemScripts';

const createDatabase = async () => {
    try {
        log.info(`Initializing Database.`);
        await loadSingleFileFromDbFolder(`${dewey}\\${appSettings.deweyScript}`);
        log.info(`Database successfully initialized.`);
    } catch (error) {
        log.error(`There was an error creating the database.`);
    }
}

const hasData = async (table) => {
    try {
        const result = await all(tableHasDataQuery);
        if(result)
            return true;
        return false;
    } catch (error) {
        log.error(`There was an error checking if the ${table} has data.`);        
        throw new Error(`Unable to check if ${table} has data.`);
    }
}


const seedDeweyData = async () => {
    const summary1Files = getScriptsInFolder('summary1');
    const summary2Files = getScriptsInFolder('summary2');
    const summary3Files = getScriptsInFolder('summary3');

    await executeScriptsAgainstDb(summary1Files);
    await executeScriptsAgainstDb(summary2Files);
    await Promise.all(executeParallelDbQuery(summary3Files));
}

const executeParallelDbQuery = files => {
    return files.map(file => run(file));
}

const executeScriptsAgainstDb = async files => {
    files.forEach(async (filePath) => {
        await run(filePath);
    })
}

const getScriptsInFolder = async folderInDbFolder => {
    const filesInDbFolder = (await getAllFilesInFolder(`${dewey}\\${folderInDbFolder}`)).filter(i => endsWith(i, '.sql'));
    return Promise.all(filesInDbFolder.map(fileName => loadSingleFileFromDbFolder(`${dewey}\\${folderInDbFolder}\\${fileName}`)));
}