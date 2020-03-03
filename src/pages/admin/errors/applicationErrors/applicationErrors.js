// @flow

const admZip = require('adm-zip');
const { remove } = require('fs-jetpack');
const { normalize } = require('path');
const log = require('utils/logger');

declare type packageErrorsType = {
    message: string,
    isSuccess: bool,
};

function packageErrors(path: string, errorList: Array<err>): packageErrorsType { 
    if(path.length === 0)
        return {
            message: 'No path was provided. Please select a path.',
            isSuccess: false
        }

    if(errorList.length === 0)
        return {
            message: 'There were no errors to package. No changes have been made.',
            isSuccess: true
        }

    try {
        const content = JSON.stringify(errorList);
        const zip = new admZip();
        zip.addFile("ErrorLogs", Buffer.alloc(content.length, content), "Developer error logs");
        zip.writeZip(path);
        remove('dewey.error.log');
    } catch(e){
        log.error('There was an error while saving your package, please try again.');
        return {
            message: 'There was an error while saving your package, please try again.',
            isSuccess: false
        }
    }

    return { message: `Successfully saved application errors to ${path}`, isSuccess: true};
}
type err = {
    timestamp: Date,
    message: string,
    stack: string
};
export type { err };
module.exports.packageErrors = packageErrors;