import log from 'utils/logger';
import { JsonObj } from 'types/generic.type';
import getDatabase from 'db/sqlite';

const getStamp = () => `Stamp[${new Date().getTime()}] -`;

export const run = async (statement: string, statementObject?: JsonObj) => {
  return await new Promise<true>((res, rej) => {
    const db = getDatabase();
    const stamp = getStamp();
    log.info(
      `${stamp} Running statement - \n\n${statement}\n\n with params ${JSON.stringify(
        statementObject
      )}.`
    );

    db.run(statement, statementObject, (err: JsonObj) => {
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

export async function all<T>(
  statement: string,
  statementObject?: object
): Promise<T[]> {
  const db = getDatabase();
  const stamp = getStamp();
  log.info(
    `${stamp} Running statement ${statement.substr(
      0,
      1024
    )} with params ${JSON.stringify(statementObject)}.`
  );
  return new Promise((res, rej) => {
    db.all(statement, statementObject, (err: object, rows: T[]) => {
      db.close();
      log.info(`${stamp} Closed Db.`);
      if (err) {
        log.error(`${stamp} ${err}`);
        return rej(err);
      }
      log.info(`${stamp} Returned ${rows ? rows.length : 0} row(s)`);
      res(rows);
    });
  });
}

export const exec = (statement: string) => {
  return new Promise<true>((res, rej) => {
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

export function single<T>(
  statement: string,
  statementObject?: object
): Promise<T | null> {
  const db = getDatabase();
  const stamp = getStamp();
  log.info(
    `${stamp} Running (single) statement ${statement.substr(
      0,
      1024
    )} with params ${JSON.stringify(statementObject)}.`
  );
  return new Promise((res, rej) => {
    db.all(statement, statementObject, (err: object, rows: T[]) => {
      db.close();
      log.info(`${stamp} Closed Db.`);
      if (err) {
        log.error(`${stamp} ${err}`);
        rej(err);
      }
      log.info(`${stamp} Returned first row of ${rows.length} row(s)`);
      if (!rows.length) res(null);
      res(rows[0]);
    });
  });
}
