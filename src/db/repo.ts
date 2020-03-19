import log from 'utils/logger';
import appSettings from 'appSettings.json';

const getStamp = () => `Stamp[${new Date().getTime()}] -`;

export const run = async (statement: string, statementObject?: object) => {
  return await new Promise((res, rej) => {
    const db = getDatabase();
    const stamp = getStamp();
    log.info(
      `${stamp} Running statement - \n\n${statement}\n\n with params ${JSON.stringify(
        statementObject
      )}.`
    );

    db.run(statement, statementObject, (err: object) => {
      db.close();
      log.info(`${stamp} Closed Db.`);
      if (err) {
        log.error(`${stamp} ${err}`);
        return rej(err);
      }

      log.info(`${stamp} Completed successfully.`);
      res(true);
    });
  });
};

export const all = (
  statement: string,
  statementObject?: object
): Promise<object[]> => {
  const db = getDatabase();
  const stamp = getStamp();
  log.info(
    `${stamp} Running statement ${statement.substr(
      0,
      1024
    )} with params ${JSON.stringify(statementObject)}.`
  );
  return new Promise((res, rej) => {
    db.all(statement, statementObject, (err: object, rows: object[]) => {
      db.close();
      log.info(`${stamp} Closed Db.`);
      if (err) {
        log.error(`${stamp} ${err}`);
        rej(err);
      }
      log.info(`${stamp} Returned ${rows.length} row(s)`);
      res(rows);
    });
  });
};

export const exec = (statement: string) => {
  return new Promise((res, rej) => {
    const db = getDatabase();
    const stamp = getStamp();
    log.info(`${stamp} Running statement - \n\n${statement}\n\n with params.`);

    db.exec(statement, (err: object) => {
      db.close();
      log.info(`${stamp} Closed Db.`);
      if (err) {
        log.error(`${stamp} ${err}`);
        return rej(err);
      }

      log.info(`${stamp} Completed successfully.`);
      res(true);
    });
  });
};

export function getDatabase() {
  const sqlite3 = window.require('sqlite3').verbose();
  const db = new sqlite3.Database(appSettings.databaseName);
  log.info('Opening database.');
  return db;
}

export function single(
  statement: string,
  statementObject?: object
): Promise<string | number | boolean | null> {
  const db = getDatabase();
  const stamp = getStamp();
  log.info(
    `${stamp} Running (single) statement ${statement.substr(
      0,
      1024
    )} with params ${JSON.stringify(statementObject)}.`
  );
  return new Promise((res, rej) => {
    db.all(statement, statementObject, (err: object, rows: object[]) => {
      db.close();
      log.info(`${stamp} Closed Db.`);
      if (err) {
        log.error(`${stamp} ${err}`);
        rej(err);
      }
      log.info(`${stamp} Returned first row of ${rows.length} row(s)`);
      if (!rows.length) res(null);
      const result = Object.values(rows[0])[0];
      res(result);
    });
  });
}
