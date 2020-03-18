import "@testing-library/jest-dom/extend-expect";

describe("processErrorLog", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should throw if an error occured while reading data", async () => {
    //Arrange
    const fs = require("fs");
    const readFile = jest.fn((path, utf8, cb) => {
      cb(new Error(), null);
    });
    fs.readFile = readFile;

    const mockErrorLog = jest.fn();
    jest.mock("utils/logger", () => ({
      __esModule: true,
      default: {
        error: mockErrorLog
      }
    }));

    let result;
    try {
      //Act
      const { processErrorLog } = require("./ErrorReport.service");
      result = await processErrorLog();
    } catch (e) {
      //Assert
      expect(result).toBeUndefined();
      expect(readFile).toHaveBeenCalled();
      expect(mockErrorLog).toHaveBeenCalledTimes(1);
    }
  });

  const fakeLoggingFile2Good1Bad = `{"timestamp":"2020-02-01 03:03:03"}\r\n{"timestamp"s:"2020-12-12 03:03:03"}\r\n{"timestamp":"2020-01-03 03:03:03"}`;
  it("should return 2 rows and 1 failed", async () => {
    //Arrange
    const readFile = jest.fn((path, utf8, cb) => {
      cb(null, fakeLoggingFile2Good1Bad);
    });
    const fs = require("fs");
    fs.readFile = readFile;

    const mockErrorLog = jest.fn();
    jest.mock("utils/logger", () => ({
      __esModule: true,
      default: {
        error: mockErrorLog
      }
    }));

    const mockParse = jest.fn();
    const mockFormat = jest.fn();

    jest.mock("date-fns", () => {
      return {
        __esModule: true,
        parse: mockParse,
        format: mockFormat
      };
    });
    const { processErrorLog } = require("./ErrorReport.service");

    //Act
    const parsedErrors = await processErrorLog();

    //Assert
    expect(parsedErrors).toBeTruthy();
    expect(mockFormat).toHaveBeenCalledTimes(2);
    expect(mockParse).toHaveBeenCalledTimes(2);
    expect(mockErrorLog).toHaveBeenCalled();
  });
});
