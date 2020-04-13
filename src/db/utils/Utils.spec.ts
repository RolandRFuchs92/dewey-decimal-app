import { mocked } from 'ts-jest/utils';
import logger from 'utils/logger';
import * as repos from 'db/repo';

import {
  jsonToStatementObject,
  getStatementColRefs,
  objectKeysToSnakeCaseString,
  objectToUpdateStatement,
  objectToInsertStatement,
  addToDb,
  updateDb,
  getAll,
  deleteRow,
  addOrUpdate
} from './index';

jest.mock('utils/logger');
jest.mock('db/repo');

const logMock = mocked(logger);
const reposMock = mocked(repos);

const obj = { foo: 'foofoo', bar: 'barbar' };
const tableName = 'foobar';

describe('jsonToStatement({...})', () => {
  const val1 = 'aaaa';
  const val2 = 'bbbb';
  const json = {
    foo: val1,
    bar: val2
  };

  const convertedJson = {
    $foo: val1,
    $bar: val2
  };

  it('should convert a json object to a statement object', () => {
    const raw = json;
    const expectedResult = convertedJson;
    const result = jsonToStatementObject(raw);

    expect(result).toEqual(expectedResult);
  });
});

describe('getStatementColsRefs', () => {
  it('should return a comma seperated list of $keys', () => {
    const obj = {
      foo: '1',
      bar: 123,
      baz: false,
      buz: 'abcde'
    };
    const expectedResult = '$foo,$bar,$baz,$buz';

    const result = getStatementColRefs(obj);
    expect(result).toBe(expectedResult);
  });
});

describe('objectKeysToSnakeCaseString', () => {
  it('should return a snake cased comma seperated lists', () => {
    const obj = {
      fooBar: '1',
      bar_baz: 123
    };
    const expectedResult = 'foo_bar,bar_baz';
    const result = objectKeysToSnakeCaseString(obj);

    expect(result).toBe(expectedResult);
  });
});

describe('objectToUpdateStatement', () => {
  const expectedUpdate = 'UPDATE foobarbazbuz';
  const expectedSet = 'foo=$foo,bar=$bar,baz=$baz';
  const expectedWhere = 'foo_id=$foo_id';

  const obj = { foo: 'fooVal', bar: 'barVal', baz: 'bazVal' };
  const tableName = 'foobarbazbuz';
  const pk = 'foo_id';

  it('should return a valid update statement', () => {
    const result = objectToUpdateStatement(obj, tableName, pk);
    expect(result).toContain(expectedUpdate);
    expect(result).toContain(expectedSet);
    expect(result).toContain(expectedWhere);
  });

  it('should return an update statement with an assumed pk', () => {
    const result = objectToUpdateStatement(obj, tableName);
    expect(result).toContain(expectedUpdate);
    expect(result).toContain(expectedSet);
    expect(result).toContain(`foobarbazbuz_id`);
  });
});

describe('objectToInsertStatement', () => {
  const obj = {
    foo: 'foofoo',
    bar: 'barbar',
    baz: 'bazbaz'
  };

  it('should create a valid insert statement', () => {
    const expectedResult =
      'INSERT INTO foobar (foo,bar,baz)VALUES ($foo,$bar,$baz)';
    let result = objectToInsertStatement(obj, 'foobar');
    result = result.replace(/\t/g, '');
    result = result.replace(/\n/g, '');

    expect(result).toBe(expectedResult);
  });
});

describe('addToDb', () => {
  it('should create a execute insert statement and log.info', async () => {
    const infoMock = jest.fn();
    const runMethod = jest.fn();

    logMock.info = infoMock;
    reposMock.run = runMethod;
    await addToDb(obj, tableName);

    expect(infoMock).toHaveBeenCalledTimes(1);
    expect(runMethod).toHaveBeenCalledTimes(1);
  });
});

describe('updateDb', () => {
  it('should create a execute insert statement and log.info', async () => {
    const infoMock = jest.fn();
    const runMethod = jest.fn();

    logMock.info = infoMock;
    reposMock.run = runMethod;
    await updateDb(obj, tableName);

    expect(infoMock).toHaveBeenCalledTimes(1);
    expect(runMethod).toHaveBeenCalledTimes(1);
  });
});

describe('getAll', () => {
  it('should log that a statement is being run', async () => {
    const expectedResult = [{ ...obj }, { ...obj }];
    const allMock = jest
      .fn()
      .mockImplementation(statement => {
        statementUsed = statement;
      })
      .mockResolvedValue(expectedResult);
    const infoMock = jest.fn();
    let statementUsed = '';
    logMock.info = infoMock;
    reposMock.all = allMock;

    const result = await getAll(tableName);

    expect(result).toEqual(expectedResult);
    expect(infoMock).toBeCalledTimes(1);
    expect(allMock).toBeCalledTimes(1);
    // TODO check the statement used.
  });
});

describe('deleteRow', () => {
  it('should call log info once and use a run statement', async () => {
    const pkField = 'somePk';
    const runMethod = jest.fn();
    const infoMethod = jest.fn();

    reposMock.run = runMethod;
    logMock.info = infoMethod;

    const result = await deleteRow(tableName, pkField)('1');

    expect(runMethod).toHaveBeenCalledTimes(1);
    expect(infoMethod).toHaveBeenCalledTimes(1);
  });
});

describe('addOrUpdate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const runMethod = jest.fn();
  const logInfoMethod = jest.fn();
  const obj = {
    foo: 'foofoo',
    bar: 'barbar'
  };
  const tableName = 'fooTable';

  const addOrUpdateObject = {
    Edit: true,
    Delete: true,
    ...obj
  };

  it('should run the addToDb method while logging once per method and return "add"', async () => {
    reposMock.run = runMethod;
    logMock.info = logInfoMethod;
    const result = await addOrUpdate(addOrUpdateObject, tableName, 'someField');

    expect(runMethod).toHaveBeenCalledTimes(1);
    expect(logInfoMethod).toHaveBeenCalledTimes(2);
    expect(result).toBe('add');
  });

  it('should run the updateDb method, log twice and return update', async () => {
    reposMock.run = runMethod;
    logMock.info = logInfoMethod;
    const updateObj = {
      Delete: true,
      Edit: true,
      [`${tableName}_id`]: '123',
      ...obj
    };
    const result = await addOrUpdate(updateObj, tableName);

    expect(runMethod).toBeCalledTimes(1);
    expect(logInfoMethod).toHaveBeenCalledTimes(2);
    expect(result).toBe('update');
  });
});
