import { books_out } from 'endpoints.json';
import { get, post, put } from 'utils/ajax';
import { CountObj, Result } from 'types/generic.type';
import serviceBase from 'components/page/service.base';

import {
  ScansModel,
  BooksOverdueModel,
  RecentlyCheckoutModel,
  CheckoutPOST,
  CheckinResult,
  TableBooksOutSchema,
  GetAllModel
} from './Booksout.type';

export default serviceBase<TableBooksOutSchema, GetAllModel>('books_out');

async function getCountResult(func: () => Promise<Result<CountObj>>) {
  try {
    const result = await func();
    return result;
  } catch (error) {
    const result: Result<CountObj> = {
      result: {
        count: 0
      }
    };
    return result;
  }
}

export async function countCheckouts(): Promise<Result<CountObj>> {
  const checkoutFunc = async () =>
    await get<{}, CountObj>(books_out.checkoutscount.uri);
  const result = getCountResult(checkoutFunc);
  return result;
}

export async function countCheckins(): Promise<Result<CountObj>> {
  const checkinFunc = async () =>
    await get<{}, CountObj>(books_out.checkinscount.uri);
  const result = getCountResult(checkinFunc);
  return result;
}

export async function countOverdueBooks(): Promise<Result<CountObj>> {
  const checkinFunc = async () =>
    await get<{}, CountObj>(books_out.overduecount.uri);
  const result = getCountResult(checkinFunc);
  return result;
}

export async function getOverduebooks(): Promise<Result<BooksOverdueModel[]>> {
  try {
    const result = await get<{}, BooksOverdueModel[]>(books_out.overdue.uri);
    return result;
  } catch (error) {
    return {
      result: []
    };
  }
}

export async function getScans(): Promise<Result<ScansModel[]>> {
  try {
    const result = await get<{}, ScansModel[]>(books_out.scans.uri);
    return result;
  } catch (error) {
    return {
      result: []
    };
  }
}

export async function checkout(
  student_id: number,
  book_id: number
): Promise<Result<ScansModel[]>> {
  try {
    const param: CheckoutPOST = {
      book_id,
      student_id
    };
    const result = await post<CheckoutPOST, ScansModel[]>(
      books_out.checkout.uri,
      param
    );
    return result;
  } catch (error) {
    const result: Result<ScansModel[]> = {
      message: 'There was an error checking out your book.'
    };
    return result;
  }
}
export type CheckinPUT = {
  booksout_id: number;
};

export async function checkin(booksout_id: number) {
  const param: CheckinPUT = {
    booksout_id
  };
  const result = await put<CheckinPUT, CheckinResult>(
    books_out.checkin.uri,
    param
  );
  return result;
}
