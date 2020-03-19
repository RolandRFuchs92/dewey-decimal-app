const admZip = require('adm-zip');
const { write } = require('fs-jetpack');

jest.mock('adm-zip', () => jest.fn());
jest.mock('fs-jetpack', () => ({ write: jest.fn() }));
jest.mock('utils/logger', () => ({
  __esModule: true,
  error: jest.fn()
}));

describe('applicationErrors', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return false and a message if no path is provided', () => {
    const testSubject = require('./applicationErrors');
    const errs = [{}, {}];

    const result = testSubject.packageErrors('', errs);

    expect(result.message).toBe('No path was provided. Please select a path.');
    expect(result.isSuccess).toBeFalsy();
  });

  it('should do nothing and return success and message displays that there was no output', () => {
    const fsJetpack = jest.mock('fs-jetpack');
    const mockError = jest.fn();
    const testSubject = require('./applicationErrors');

    const result = testSubject.packageErrors('aa', []);

    expect(mockError).toHaveBeenCalledTimes(0);
    expect(result.message).toBe(
      `There were no errors to package. No changes have been made.`
    );
    expect(result.isSuccess).toBeTruthy();
  });

  it('should move the log to a zipped user selected location', () => {
    const addFile = jest.fn();
    const writeZip = jest.fn();
    admZip.mockImplementation(() => ({
      addFile,
      writeZip
    }));

    const testSubject = require('./applicationErrors');
    const path = 'aa';
    const errorList = [{}, {}];

    const result = testSubject.packageErrors(path, errorList);

    expect(addFile).toHaveBeenCalled();
    expect(writeZip).toHaveBeenCalledWith(path);
    expect(write).toHaveBeenCalled();
    expect(result.message).toBe('Successfully saved application errors to aa');
    expect(result.isSuccess).toBeTruthy();
  });

  it('should retyrn an error if error occurs during zip creation and alert the user about the error.', () => {
    const testSubject = require('./applicationErrors');

    admZip.mockImplementation(() => ({
      addFile: () => {
        throw new Error();
      }
    }));

    const errs = [{}, {}];
    const result = testSubject.packageErrors('aa', errs);

    expect(result.message).toBe(
      'There was an error while saving your package, please try again.'
    );
    expect(result.isSuccess).toBeFalsy();
  });
});
