import log from 'utils/logger';
import fs from 'fs';
import path from 'path';
const scriptsLocation = path.resolve(
  __dirname,
  '..',
  'src',
  'db',
  'sql',
  'deweySystemScripts'
);

log.info(`Db scripts will be looked for at ${scriptsLocation}`);

export const loadSingleFileFromDbFolder = (fileFromDbSqlFolder: string) => {
  return new Promise<string>((res, rej) => {
    const pathLocation = path.join(scriptsLocation, fileFromDbSqlFolder);
    // @ts-ignore
    fs.readFile(pathLocation, 'utf8', (err: Error, data: string) => {
      if (err) {
        log.error(
          `There was an error loading file ${fileFromDbSqlFolder} - ${JSON.stringify(
            err
          )}`
        );
        rej(false);
      }
      res(data);
    });
  });
};

export const getAllFilesInFolder = (folderInDbFolder: string) => {
  return new Promise<string[]>((res, rej) => {
    const readDir = path.join(scriptsLocation, folderInDbFolder);
    fs.readdir(
      readDir,
      // @ts-ignore
      'utf8',
      (err: Error, data: string[]) => {
        if (err) {
          log.error(
            `There was an error reading from the folder '${folderInDbFolder}'. \n ${JSON.stringify}`
          );
          rej(false);
        }
        res(data);
      }
    );
  });
};
