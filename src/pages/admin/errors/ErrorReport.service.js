// @flow
import appSettings from 'appSettings';
import { trim } from 'lodash'
//$FlowFixMe
import { format, parse } from 'date-fns';
import log from 'utils/logger';


const fs = window.require('fs');
const { formatDate : {errorLog : {from, to}}} = appSettings;


export const processErrorLog = async () => {
    return new Promise((res, rej) => {
        fs.readFile(`dewey.error.log`, 'utf8', (err, data) =>{
            if(err){
                log.error(err);
                return rej(err);
            }
    
            try {
                const parsedErrors=[];
                const rows = data.split('\r\n')
                rows.forEach((row,index) => {
                    try {
                        if(trim(row).length > 0) {
                            const json =  JSON.parse(row);
                            json.timestamp = format(parse(json.timestamp, from, new Date()),to);
                            parsedErrors.push(json);
                        }
                    } catch(e) {
                        log.error(e);
                    }
                });
                res(parsedErrors);
            } catch (error) {
                log.error(error);
                rej(error);
            }
        });
    })
}

export const errorLogErrorsCount = async () => {
    return await new Promise((res, rej) => {
        fs.readFile('dewey.error.log', 'utf8', (err, data) => {
            if(err) rej(err);
            res(typeof data === 'string' ? data.split('\r\n').length : 0);
        })
    })
}