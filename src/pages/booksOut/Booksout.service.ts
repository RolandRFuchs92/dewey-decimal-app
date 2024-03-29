import { booksout } from 'endpoints.json';
import { get, post, put } from 'utils/ajax';
import { CountObj, Result } from 'types/generic.type';
import serviceBase from 'components/page/service.base';

import {
  ScansModel,
  BooksOverdueModel,
  RecentlyCheckoutModel,
  CheckoutPOST,
  CheckinResult,
  TableBooksOutSchema
} from './Booksout.type';

export default serviceBase<TableBooksOutSchema, TableBooksOutSchema>(
  'booksout'
);

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
    await get<{}, CountObj>(booksout.checkoutscount.uri);
  const result = getCountResult(checkoutFunc);
  return result;
}

export async function countCheckins(): Promise<Result<CountObj>> {
  const checkinFunc = async () =>
    await get<{}, CountObj>(booksout.checkinscount.uri);
  const result = getCountResult(checkinFunc);
  return result;
}

export async function countOverdueBooks(): Promise<Result<CountObj>> {
  const checkinFunc = async () =>
    await get<{}, CountObj>(booksout.overduecount.uri);
  const result = getCountResult(checkinFunc);
  return result;
}

export async function getOverduebooks(): Promise<Result<BooksOverdueModel[]>> {
  try {
    const result = await get<{}, BooksOverdueModel[]>(booksout.overdue.uri);
    return result;
  } catch (error) {
    return {
      result: []
    };
  }
}

export async function getScans(): Promise<Result<ScansModel[]>> {
  try {
    const result = await get<{}, ScansModel[]>(booksout.scans.uri);
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
      booksout.checkout.uri,
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
    booksout.checkin.uri,
    param
  );
  return result;
}
