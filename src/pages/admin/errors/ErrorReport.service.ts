import appSettings from 'appSettings.json';
import { trim } from 'lodash';
import { format, parse } from 'date-fns';
// import log from 'utils/logger';
import { ProcessErrorLogResultModel } from './ErrorReport.type';
import fs from 'fs';

const {
  formatDate: {
    errorLog: { from, to }
  }
} = appSettings;

export const processErrorLog = async (): Promise<ProcessErrorLogResultModel[]> => {
  return new Promise((res, rej) => {
    // @ts-ignore
    fs.readFile(`dewey.error.log`, 'utf8', (err: Error, data: string) => {
      if (err) {
        // log.error(err.toString());
        return rej(err);
      }

      try {
        const parsedErrors: ProcessErrorLogResultModel[] = [];
        const rows = data.split('\r\n');
        rows.forEach(row => {
          try {
            if (trim(row).length > 0) {
              const json = JSON.parse(row);
              json.timestamp = format(
                parse(json.timestamp, from, new Date()),
                to
              );
              parsedErrors.push(json);
            }
          } catch (e) {
            // log.error(e
          }
        });
        res(parsedErrors);
      } catch (error) {
        // log.error(error);
        rej(error);
      }
    });
  });
};

export const errorLogErrorsCount = async () => {
  return await new Promise<number>((res, rej) => {
    // @ts-ignore
    fs.readFile('dewey.error.log', 'utf8', (err: Error, data: string) => {
      if (err) rej(err);
      res(typeof data === 'string' ? data.split('\r\n').length : 0);
    });
  });
};
