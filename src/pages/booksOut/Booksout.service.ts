import { booksout } from 'endpoints.json';
import { get } from 'utils/ajax';
import { CountObj, Result } from 'types/generic.type';

export default () => {};

export async function countCheckouts(): Promise<Result<CountObj>> {
  const result = await await get<{}, CountObj>(booksout.checkoutscount.uri);
  return result;
}
