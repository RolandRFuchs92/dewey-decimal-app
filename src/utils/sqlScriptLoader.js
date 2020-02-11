import log from 'utils/logger';

const fs = window.require('fs');
const dbRoot = `src\\db\\`;

export const loadSingleFileFromDbFolder = fileFromDbSqlFolder => {
    return new Promise((res, rej) => {
        fs.readFile(`${dbRoot}${fileFromDbSqlFolder}`, 'utf8',(err, data) => {
            if(err) {
                log.error(`There was an error loading file ${fileFromDbSqlFolder} - ${JSON.stringify(err)}`);
                rej(false);
            }
            res(data);
        });    
    })
}

export const getAllFilesInFolder = folderInDbFolder => {
    return new Promise((res, rej) => {
        fs.readdir(`${dbRoot}${folderInDbFolder}`, 'utf8', (err, data) => {
            if(err) {
                log.error(`There was an error reading from the folder '${folderInDbFolder}'. \n ${JSON.stringify}`);
                rej(false);
            }
            res(data);
        })
    });
}