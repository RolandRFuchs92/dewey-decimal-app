import { get, post, reqDelete } from 'utils/ajax';
import endpoints from 'endpoints.json';
import { Result } from 'types/generic.type';

export default <TResult, TUpdateInsert>(urlBase: keyof typeof endpoints) => {
  const deleteFunc = async (id: number) => {
    const result = await reqDelete<{ id: number }, boolean>(urlBase, { id });
    return result;
  };

  const getAll = async (): Promise<Result<TResult[]>> =>
    await get<{}, TResult[]>(urlBase);

  const addOrUpdate = async <TParam>(
    params: TParam
  ): Promise<Result<TResult[]>> =>
    await post<TParam, TResult[]>(urlBase, params);

  const baseService = {
    getAll,
    addOrUpdate,
    deleteFunc
  };
  return baseService;
};
