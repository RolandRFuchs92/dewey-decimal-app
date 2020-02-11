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
    LIMIT 1;
`;

export default async function setupDatabase(){
    try {
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
        const createDbScript = await loadSingleFileFromDbFolder(`${deweySqlRoot}\\${appSettings.databaseScriptName}`);
        await exec(createDbScript);
        log.info(`Database successfully initialized.`);
    } catch (error) {
        log.error(`There was an error creating the database. \n ${JSON.stringify(error)}`);
        throw error;
    }
}

/**
 * 
 * @param {string} table 
 */
const hasData = async (table) => {
    try {
        const result = await all(tableHasDataQuery(table));
        if(result.length === 0)
            return false;
        return true;
    } catch (error) {
        log.error(`There was an error checking if the table[${table}] has data. ${JSON.stringify(error)}`);        
        throw error;
    }
}


const seedDatabase = async () => {
    const summary1Queries = getScriptsInFolder('summary1');
    const summary2Queries = getScriptsInFolder('summary2');
    const summary3Queries = getScriptsInFolder('summary3');

    await executeParallelDbQuery(tableDeweySummary1Name, await summary1Queries);
    await executeParallelDbQuery(tableDeweySummary2Name, await summary2Queries);
    await executeParallelDbQuery(deweySummary3Name, await summary3Queries);
}

/**
 * 
 * @param {string} tableName 
 * @param {string} query 
 */
const seedTable = async (tableName, query) => {
    try {
        const tableHasData = await hasData(tableName);
        if(!tableHasData) {
            await run(query);
            log.info(`table[${tableName}] has been populated.`);
            return true;
        }
        log.info(`table[${tableName}] already has data. Skipping seed.`);
        return false;
    } catch (error) {
        log.error(`An error occured while adding data to table[${tableName}] \n${error}`);
        throw error;
    }
}


/**
 * 
 * @param {string} tableName 
 * @param {string[]} files 
 */
const executeParallelDbQuery = (tableName, files) => {
    //be tea dubs, used this cause i read somewhere that map/foreach/reduce is faster than foreach, but all does the same thing
    files.reduce(async (previousQuery, file) => {
        const hasPopulated = await previousQuery;
        if(!hasPopulated)
            return;

        await seedTable(tableName, file);
    });
}

const getScriptsInFolder = async folderInDbFolder => {
    const filesInDbFolder = (await getAllFilesInFolder(`${deweySqlRoot}\\${folderInDbFolder}`)).filter(i => endsWith(i, '.sql'));
    return await Promise.all(filesInDbFolder.map(fileName => loadSingleFileFromDbFolder(`${deweySqlRoot}\\${folderInDbFolder}\\${fileName}`)));
}