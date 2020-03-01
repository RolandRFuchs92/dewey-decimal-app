// @flow
describe('applicationErrors', () => {
    beforeEach();

    it('should do nothing and return success and message displays that there was no output', () => {
        const fsJetpack = jest.mock('fs-jetpack');

        const mockError = jest.fn();
        const log = jest.mock('utils/logger', () => {
            return {
                __esModule: true,
                error: mockError
            }
        });
        
        const testSubject = require('./applicationErrors');
        const result = testSubject.packageErrors([]);
        expect(mockError).toHaveBeenCalledTimes(0);
        expect(result.message).toBe(`There were no errors to package. No changes have been made.`);
    })

    it('should move the log to a zipped user selected location', () => {
        const mockZipFile = jest.fn().mockReturnValue(null);
        const mockGenerate = jest.fn();
        const zipFile = jest.mock('node-zip', () => () => {
            return {
                __esModule: true,
                file: mockZipFile,
                generate: mockGenerate
            }
        });


    });

    it('should clear the log out after a zip is created', () => {

    })

    it('should log an error if an error occurs during zip creationg and alert the user about the error.', () =>{

    })
})