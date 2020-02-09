import { loadSingleFileFromDbFolder, getAllFilesInFolder } from 'utils/sqlScriptLoader';
import { run } from 'db/repo';
import { endsWith } from 'lodash';

export default initializeDb

const dewey = 'deweySystemScripts';
const initializeDb = async () => {
    const generateDeweyScript = await loadSingleFileFromDbFolder(`${dewey}\\generateDewey.sql`);
    const summary1Files = getScriptsInFolder('summary1');
    const summary2Files = getScriptsInFolder('summary2');
    const summary3Files = getScriptsInFolder('summary3');

    await run(generateDeweyScript);
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