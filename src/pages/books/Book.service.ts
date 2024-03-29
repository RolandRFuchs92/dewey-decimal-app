import { get, post } from 'utils/ajax';
import { book } from 'endpoints.json';
import {
  GetBookCallNumberModel,
  BookSchema,
  TableBookSchema
} from './Book.type';
import { Result, DropdownListModel } from 'types/generic.type';
import serviceBase from 'components/page/service.base';

export default serviceBase<TableBookSchema, BookSchema>('book');

export type GetBookByCallNumberPOST = {
  callnumber: string;
};

export async function getBookByCallNumber(
  callnumber: string
): Promise<Result<GetBookCallNumberModel>> {
  try {
    const callnumberParam: GetBookByCallNumberPOST = {
      callnumber
    };
    const callnumberResult = await post<
      GetBookByCallNumberPOST,
      GetBookCallNumberModel
    >(book.getBookByCallNumber.uri, callnumberParam);
    return callnumberResult;
  } catch (error) {
    const result: Result<any> = {
      message: `There was an error getting your book by ${callnumber}`,
      result: undefined
    };
    return result;
  }
}

export async function getBooksDropdownList() {
  try {
    const result = await get<{}, DropdownListModel[]>(book.dropdownList.uri);
    return result;
  } catch (error) {
    const result: Result<any> = {
      message: `There was an unexpected error getting the dropdown list for books.`,
      result: undefined
    };
    return result;
  }
}
