import appSettings from 'appSettings.json';
import log from 'utils/logger';

export default function getDatabase() {
  const sqlite3 = window.require('sqlite3').verbose();
  const db = new sqlite3.Database(appSettings.databaseName);
  log.info('Opening database.');
  return db;
}
