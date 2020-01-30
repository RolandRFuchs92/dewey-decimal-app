import { getDatabase } from './utils';
import log from 'utils/logger';

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