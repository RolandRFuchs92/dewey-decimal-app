import log from 'utils/logger';
import { database } from '../../package.json';

export const run  = (statement, statementObject) => {
    return new Promise((res, rej) => {
        const db = getDatabase();

        db.run(statement, statementObject, err => {
            if (err) {
                log.error(err);
                return rej(err);
            }
            log.info(`ran statement - \n\n${statement}\n\n with params ${JSON.stringify(statementObject)} successfully.`);
        })

        db.close();
        log.info('Closed Db');
        res(true)
    });
}


export const all = (statement) => {
    const db = getDatabase();
    log.info(`Running statement ${statement}`);
    return new Promise((res, rej) => {
        db.all(statement, (err, rows) => {
            if(err) {
                log.error(err);
                rej(err);
            }
            db.close();
            log.info(`Returned ${rows.length} rows`);
            res(rows);
        });
    })
}

export function getDatabase() {
	const sqlite3 = window.require('sqlite3').verbose();
	const db = new sqlite3.Database(database);
	log.info('Opening database.');
	return db;
}