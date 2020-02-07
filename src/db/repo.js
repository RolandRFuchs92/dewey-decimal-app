import log from 'utils/logger';
import { database } from '../../package.json';

const getStamp = () => `Stamp[${new Date().getTime()}] -`;

export const run  = (statement, statementObject) => {
    return new Promise((res, rej) => {
        const db = getDatabase();
        const stamp = getStamp();
        log.info(`${stamp} Running statement - \n\n${statement}\n\n with params ${JSON.stringify(statementObject)}.`);
        
        db.run(statement, statementObject, err => {
            db.close();
            log.info(`${stamp} Closed Db.`);
            if (err) {
                log.error(`${stamp} ${err}`);
                return rej(err);
            }

            log.info(`${stamp} Returned Successfully.`);
            res(true)
        })
    });
}


export const all = (statement) => {
    const db = getDatabase();
    const stamp = getStamp();
    log.info(`${stamp} Running statement ${statement}`);
    return new Promise((res, rej) => {
        db.all(statement, (err, rows) => {
            db.close();
            log.info(`${stamp} Closed Db.`);
            if(err) {
                log.error(`${stamp} ${err}`);
                rej(err);
            }
            log.info(`${stamp} Returned ${rows.length} row(s)`);
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