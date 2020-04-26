import { booksout } from 'endpoints.json';
import { get } from 'utils/ajax';
import { CountObj, Result } from 'types/generic.type';

import { ScansModel, BooksOverdueModel } from './Booksout.type';

export default () => {};

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
    await get<{}, CountObj>(booksout.checkinscount.uri);
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
