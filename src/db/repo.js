import log from "utils/logger";
import appSettings from "appSettings";

const getStamp = () => `Stamp[${new Date().getTime()}] -`;

/**
 * Will execute a single sql statement in a given query (UPDATE, INSERT, DELETE, etc)
 *
 * @param {string} statement
 * @param {JSON} statementObject
 */
export const run = async (statement, statementObject = {}) => {
  return await new Promise((res, rej) => {
    const db = getDatabase();
    const stamp = getStamp();
    log.info(
      `${stamp} Running statement - \n\n${statement}\n\n with params ${JSON.stringify(
        statementObject
      )}.`
    );

    db.run(statement, statementObject, err => {
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

/**
 * Will return data rows as a result of a query (SELECT)
 *
 * @param {string} statement
 * @param {JSON} statementObject
 */
export const all = (statement, statementObject) => {
  const db = getDatabase();
  const stamp = getStamp();
  log.info(
    `${stamp} Running statement ${statement.substr(
      0,
      1024
    )} with params ${JSON.stringify(statementObject)}.`
  );
  return new Promise((res, rej) => {
    db.all(statement, statementObject, (err, rows) => {
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

/**
 * Executes each statement in an sql statement. (EVERYTHING)
 * @param {string} statement
 */
export const exec = statement => {
  return new Promise((res, rej) => {
    const db = getDatabase();
    const stamp = getStamp();
    log.info(`${stamp} Running statement - \n\n${statement}\n\n with params.`);

    db.exec(statement, err => {
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

/**
 * Will initialize and return a database object.
 */
export function getDatabase() {
  const sqlite3 = window.require("sqlite3").verbose();
  const db = new sqlite3.Database(appSettings.databaseName);
  log.info("Opening database.");
  return db;
}

export function single(statement, statementObject) {
  const db = getDatabase();
  const stamp = getStamp();
  log.info(
    `${stamp} Running (single) statement ${statement.substr(
      0,
      1024
    )} with params ${JSON.stringify(statementObject)}.`
  );
  return new Promise((res, rej) => {
    db.all(statement, statementObject, (err, rows) => {
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
