import { booksout } from 'endpoints.json';
import { get } from 'utils/ajax';
import { CountObj, Result } from 'types/generic.type';

export default () => {};

export async function countCheckouts(): Promise<Result<CountObj>> {
  try {
    const result = await get<{}, CountObj>(booksout.checkoutscount.uri);
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

export async function countCheckins(): Promise<Result<CountObj>> {
  try {
    const result = await get<{}, CountObj>(booksout.checkinscount.uri);
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
