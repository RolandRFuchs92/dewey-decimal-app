import appSettings from 'appSettings';
import { trim } from 'lodash'
import { format, parse } from 'date-fns';
import log from 'utils/logger';

const fs = window.require('fs');
const { formatDate : {errorLog : {from, to}}} = appSettings;


export const processErrorLog = () => {
    return new Promise((res, rej) => {
        fs.readFile(`dewey.error.log`,'utf8',(err, data) =>{
            if(err){
                log.error(err);
                return rej(err);
            }
    
            try {
                const failedToParse=[];
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
                        failedToParse.push({row, index, error: e});
                    }
                });
                res([parsedErrors, failedToParse]);
            } catch (error) {
                log.error(error);
                rej(error);
            }
        });
    })
}


export const someService = () => {

}