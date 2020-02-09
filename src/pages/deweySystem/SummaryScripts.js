const fs = window.require('fs');
const log = window.require('winston');

const loadScripts = async () => {
    
    const generateDeweySystem = loadFile('generateDewey.sql');
    const insertDeweySummary1 = loadFile('\\sql\\dewey_summary1_data.sql');
    const insertDeweySummary2 = loadFile('\\sql\\dewey_summary1_data.sql');
    const insertDeweySummary3_000 = loadFile('\\sql\\dewey_summary1_data.sql');
    const insertDeweySummary1 = loadFile('\\sql\\dewey_summary1_data.sql');
    const insertDeweySummary1 = loadFile('\\sql\\dewey_summary1_data.sql');

}

const loadFile = fileFromDbFolder => {
    return new Promise((res, rej) => {
        fs.readFile(`src\\db\\${fileFromDbFolder}`, 'utf8',(err, data) => {
            if(err) {
                log.error(`There was an error loading file ${fileFromDbFolder}.`);
                rej(false);
            }
            res(data);
        });    
    })
}