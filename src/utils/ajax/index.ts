import axios from 'axios';

import { development, production } from 'endpoints.json';
import { Result } from 'types/generic.type';

const {
  get: axiosGet,
  put: axiosPut,
  post: axiosPost,
  delete: axiosDelete
} = axios;

const requiredHeaders = {
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    crossdomain: true
  }
};

const baseUri =
  process.env.NODE_ENV === 'development' ? development.url : production.url;

export type AxiosErrorModel<T> = {
  response: T;
};
export type RequiredHeaders = typeof requiredHeaders;
export type ParamsHeaders<T> = {
  params: T | {};
} & RequiredHeaders;

function getParamsHeader<T>(data: T | {}) {
  const result: ParamsHeaders<T> = {
    // withCredentials: requiredHeaders.withCredentials,
    headers: {
      ...requiredHeaders.headers
    },
    params: { ...data }
  };

  return result;
}

async function get<P, R>(uri: string, params: P | {} = {}) {
  console.log(uri);
  const config = getParamsHeader<P>(params);
  const result = await axiosGet(`${baseUri}/${uri}`, config);
  return result.data as Result<R>;
}

async function put<P, R>(uri: string, body?: P) {
  const result = await axiosPut(`${baseUri}/${uri}`, body, requiredHeaders);
  return result.data as Result<R>;
}

async function post<P, R>(uri: string, body?: P) {
  const result = await axiosPost(`${baseUri}/${uri}`, body, requiredHeaders);
  return result.data as Result<R>;
}

async function reqDelete<P, R>(uri: string, body?: P) {
  const result = await axiosDelete(`${baseUri}/${uri}`, {
    data: body,
    ...requiredHeaders
  });
  return result.data as Result<R>;
}

export default {
  reqDelete,
  get,
  put,
  post,
  requiredHeaders
};

export { reqDelete, get, put, post, requiredHeaders as headers };
