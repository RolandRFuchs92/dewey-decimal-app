import { mocked } from 'ts-jest/utils';

import logger from 'utils/logger';
import * as sqliteOrig from 'db/sqlite';

import { run, all, exec, single } from './index';

jest.mock('db/sqlite');
jest.mock('utils/logger');

const sqlite = mocked(sqliteOrig);
const log = mocked(logger);

describe('db/repo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const testStatement = 'testStmt';
  const testObj = { ojb: 'obj' };

  const runMethod = jest.fn((stmt, stmtObj, clbk) => clbk());
  const allMethod = jest.fn((stmt, stmtObj, clbk) => clbk());
  const singleMethod = jest.fn();
  const closeMethod = jest.fn();

  sqlite.default = jest.fn(() => {
    return {
      run: runMethod,
      all: allMethod,
      close: closeMethod
    };
  });

  const logInfo = jest.fn();
  const logError = jest.fn();

  log.error = logError;
  log.info = logInfo;

  describe('run(...)', () => {
    it('should call logs during its execution', async () => {
      const result = await run(testStatement, testObj);

      expect(logInfo).toHaveBeenCalledTimes(3);
      expect(runMethod).toHaveBeenCalledWith(
        testStatement,
        testObj,
        expect.any(Function)
      );
      expect(closeMethod).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('should call the error log if an error is returned', async () => {
      const expectedErr = 'error result';
      const runJest = jest.fn((stmt, stmtObj, cb) => cb(expectedErr));
      sqlite.default = jest.fn(() => {
        return {
          run: runJest,
          close: closeMethod
        };
      });
      try {
        await run(testStatement, testObj);
      } catch (e) {
        expect(e).toBe(expectedErr);
      }

      expect(logInfo).toHaveBeenCalledTimes(2);
      expect(logError).toHaveBeenCalledTimes(1);
      expect(closeMethod).toHaveBeenCalledTimes(1);
    });
  });

  describe('all(...)', () => {
    it('should call logs during execution', async () => {
      const expectedResult = ['this', 'is', 'expected'];
      const allJest = jest.fn((stmt, stmtObj, cb) => {
        cb();
        return expectedResult;
      });
      sqlite.default = jest.fn(() => {
        return {
          all: allJest,
          close: closeMethod
        };
      });

      await all(testStatement, testObj);

      expect(closeMethod).toHaveBeenCalledTimes(1);
      expect(logInfo).toHaveBeenCalledTimes(3);
      expect(logError).toHaveBeenCalledTimes(0);

      expect(allJest).toHaveBeenCalledWith(
        testStatement,
        testObj,
        expect.any(Function)
      );
    });

    it('should throw an error with the related error, log and close db', async () => {
      const expectedError = 'This was the error :)';
      const allJest = jest.fn((stmt, stmtObj, cb) => {
        cb(expectedError);
      });

      sqlite.default = jest.fn(() => {
        return {
          all: allJest,
          close: closeMethod
        };
      });

      try {
        await all(testStatement, testObj);
      } catch (error) {
        expect(error).toBe(expectedError);
      }

      expect(closeMethod).toHaveBeenCalledTimes(1);
      expect(logInfo).toHaveBeenCalledTimes(2);
      expect(logError).toHaveBeenCalledTimes(1);
    });
  });

  describe('exec(...)', () => {
    it('should call logs during execution', async () => {
      const jestExec = jest.fn((stmt, cb) => {
        cb();
      });

      sqlite.default = jest.fn(() => {
        return {
          exec: jestExec,
          close: closeMethod
        };
      });

      const result = await exec(testStatement);

      expect(logInfo).toHaveBeenCalledTimes(3);
      expect(logError).toHaveBeenCalledTimes(0);
      expect(closeMethod).toHaveBeenCalledTimes(1);
      expect(jestExec).toHaveBeenCalledWith(
        testStatement,
        expect.any(Function)
      );
    });

    it('should throw an expected error and log correctly', async () => {
      const expectedError = 'this was the expected error';
      const jestExec = jest.fn((stmt, cb) => {
        cb(expectedError);
      });

      sqlite.default = jest.fn(() => {
        return {
          exec: jestExec,
          close: closeMethod
        };
      });

      try {
        await exec(testStatement);
      } catch (error) {
        expect(error).toBe(expectedError);
      }
      expect(logError).toHaveBeenCalledTimes(1);
      expect(logInfo).toHaveBeenCalledTimes(2);
      expect(closeMethod).toHaveBeenCalledTimes(1);
    });
  });

  describe('single(...)', () => {
    it('should call logs during execution', async () => {
      const expectedResult = [{ a: 1 }, { a: 2 }, { a: 3 }];
      const jestAll = jest.fn((stmt, stmtObj, cb) => {
        cb(undefined, expectedResult);
      });

      sqlite.default = jest.fn(() => {
        return {
          all: jestAll,
          close: closeMethod
        };
      });

      const result = await single(testStatement, testObj);

      expect(logInfo).toHaveBeenCalledTimes(3);
      expect(logError).toHaveBeenCalledTimes(0);
      expect(closeMethod).toHaveBeenCalledTimes(1);
      expect(jestAll).toHaveBeenCalledWith(
        testStatement,
        testObj,
        expect.any(Function)
      );
      expect(result).toEqual(expectedResult[0]);
    });

    it('should throw an expected error and log correctly', async () => {
      const expectedError = 'this was the expected error';
      const jestSingle = jest.fn((stmt, cb) => {
        cb(expectedError);
      });

      const jestAll = jest.fn((stmt, stmtObj, cb) => cb(expectedError, null));

      sqlite.default = jest.fn(() => {
        return {
          all: jestAll,
          single: jestSingle,
          close: closeMethod
        };
      });

      try {
        await single(testStatement);
      } catch (error) {
        expect(error).toBe(expectedError);
      }
      expect(logError).toHaveBeenCalledTimes(1);
      expect(logInfo).toHaveBeenCalledTimes(2);
      expect(closeMethod).toHaveBeenCalledTimes(1);
    });
  });
});
