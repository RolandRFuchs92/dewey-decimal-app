import log from "utils/logger";
import { JsonObj } from "types/Generic";

const fs = window.require("fs");
const dbRoot = `src\\db\\`;

export const loadSingleFileFromDbFolder = (fileFromDbSqlFolder: string) => {
  return new Promise((res, rej) => {
    fs.readFile(
      `${dbRoot}${fileFromDbSqlFolder}`,
      "utf8",
      (err: Error, data: JsonObj) => {
        if (err) {
          log.error(
            `There was an error loading file ${fileFromDbSqlFolder} - ${JSON.stringify(
              err
            )}`
          );
          rej(false);
        }
        res(data);
      }
    );
  });
};

export const getAllFilesInFolder = (folderInDbFolder: string) => {
  return new Promise((res, rej) => {
    fs.readdir(
      `${dbRoot}${folderInDbFolder}`,
      "utf8",
      (err: Error, data: JsonObj) => {
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
