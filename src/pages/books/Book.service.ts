import { get } from 'utils/ajax';
import { books } from 'endpoints.json';
import { GetBookCallNumberModel } from './Book.type';
import { Result } from 'types/generic.type';

export default () => {};

export type GetBookByCallNumberPOST = {
  callnumber: string;
};

export async function getBookByCallNumber(callnumber: string) {
  try {
    const callnumberParam: GetBookByCallNumberPOST = {
      callnumber
    };
    const callnumberResult = await get<
      GetBookByCallNumberPOST,
      GetBookCallNumberModel
    >(books.getBookByCallNumber.uri, callnumberParam);
    return callnumberResult;
  } catch (error) {
    const result: Result<any> = {
      message: `There was an error getting your book by ${callnumber}`,
      result: undefined
    };
    return result;
  }
}
