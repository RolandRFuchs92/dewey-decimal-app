import { Result } from 'types/generic.type';
import { AxiosError } from 'axios';
import { isNil } from 'lodash';

import { get, put, post, reqDelete } from './index';

export default () => {};

export type HTTPMethodType = 'GET' | 'PUT' | 'POST' | 'DELETE';

function processAjaxError<P, R>(
  err: AxiosError,
  httpMethod: HTTPMethodType,
  url: string,
  params: P
): Result<R> {
  if (err.response && err.response.data && !isNil(err.response.data.isSuccess))
    return err.response.data;

  const result: Result<R> = {
    message: 'There was an unexpected error.'
  };
  if (process.env.NODE_ENV === 'production') return result;

  console.debug(
    `AJAX ERROR: METHOD[${httpMethod}] TO URL[${url}] USING PARAMS - \n${JSON.stringify(
      params,
      null,
      2
    )}`
  );
  if (err.response && err.response.data && isNil(err.response.data.isSuccess))
    console.debug(err.response.data);

  if (err.response && !err.response.data) console.debug(err.response);

  return result;
}

export async function DELETE<P, R>(url: string, params: P) {
  try {
    const result = await reqDelete<P, R>(url, params);
    return result;
  } catch (error) {
    return processAjaxError<P, R>(error, 'DELETE', url, params);
  }
}

export async function PUT<P, R>(url: string, params: P) {
  try {
    const result = await put<P, R>(url, params);
    return result;
  } catch (error) {
    return processAjaxError<P, R>(error, 'PUT', url, params);
  }
}

export async function GET<P, R>(url: string, params: P) {
  try {
    const result = await get<P, R>(url, params);
    return result;
  } catch (error) {
    return processAjaxError<P, R>(error, 'GET', url, params);
  }
}

export async function POST<P, R>(url: string, params: P) {
  try {
    const result = await post<P, R>(url, params);
    return result;
  } catch (error) {
    return processAjaxError<P, R>(error, 'POST', url, params);
  }
}
