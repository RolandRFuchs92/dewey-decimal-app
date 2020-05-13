import sqlite3 from 'sqlite3';

import appSettings from 'appSettings.json';
import log from 'utils/logger';

export default function getDatabase() {
  const sqlite3Db = sqlite3.verbose();
  const db = new sqlite3Db.Database(appSettings.databaseName);
  log.info('Opening database.');
  return db;
}
