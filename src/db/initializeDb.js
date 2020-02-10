import { endsWith } from 'lodash';

import { loadSingleFileFromDbFolder, getAllFilesInFolder } from 'utils/sqlScriptLoader';
import { run, exec, all } from './repo'
import appSettings from 'appSettings.js';
import log from  'utils/logger';

const tableDeweySummary1Name = `dewey_summary`;
const tableDeweySummary2Name = `dewey_summary_2`;
const deweySummary3Name = `dewey_summary_3`;

const tableHasDataQuery = table => `
    SELECT
        *
    FROM
        ${table}
    LIMMIT 1;
`;

export default async function setupDatabase(){
    try {
        debugger;
        await createDatabase();
        await seedDatabase();
        log.info(`Database successfully checked, initialized and seeded.`);
    } catch (error) {
        log.error(`Catastrophic database startup error. Please try again.`);
        log.error(error);
        return false;
    }
}

const deweySqlRoot = 'sql\\deweySystemScripts';

const createDatabase = async () => {
    try {
        log.info(`Initializing Database.`);
        const createDbScript = await loadSingleFileFromDbFolder(`${deweySqlRoot}\\${appSettings.deweyScript}`);
        await exec(createDbScript);
        log.info(`Database successfully initialized.`);
    } catch (error) {
        log.error(`There was an error creating the database.`,[error]);
        throw error;
    }
}

/**
 * 
 * @param {string} table 
 */
const hasData = async (table) => {
    try {
        const result = await all(tableHasDataQuery);
        if(result)
            return true;
        return false;
    } catch (error) {
        log.error(`There was an error checking if the table[${table}] has data.`);        
        throw error;
    }
}


const seedDatabase = async () => {
    const summary1Files = getScriptsInFolder('summary1');
    const summary2Files = getScriptsInFolder('summary2');
    const summary3Files = getScriptsInFolder('summary3');

    await seedTable(tableDeweySummary1Name, summary1Files);
    await seedTable(tableDeweySummary2Name, summary2Files);
    await Promise.all(executeParallelDbQuery(deweySummary3Name, summary3Files));
}

/**
 * 
 * @param {string} tableName 
 * @param {string} query 
 */
const seedTable = async (tableName, query) => {
    try {
        if(!hasData(tableName)) {
            await run(query);
            log.info(`table[${tableName}] has been populated.`);
            return;
        }
        log.info(`table[${tableName}] already has data. Skipping seed.`);
    } catch (error) {
        log.error(`An error occured while adding data to table[${tableName}]`,{error});
        throw error;
    }
}


/**
 * 
 * @param {string} tableName 
 * @param {string[]} files 
 */
const executeParallelDbQuery = async ( tableName, files) => {
    return files.map(file => seedTable(tableName, file));
}

const getScriptsInFolder = async folderInDbFolder => {
    const filesInDbFolder = (await getAllFilesInFolder(`${deweySqlRoot}\\${folderInDbFolder}`)).filter(i => endsWith(i, '.sql'));
    return Promise.all(filesInDbFolder.map(fileName => loadSingleFileFromDbFolder(`${deweySqlRoot}\\${folderInDbFolder}\\${fileName}`)));
}