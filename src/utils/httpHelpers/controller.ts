import { Response } from 'express';
import log from 'utils/logger';

export default () => {};

export function genericErrorHandle(
  route: string,
  error: Error,
  res: Response<any>,
  errorMessage: string
) {
  log.error(`There was an error at /student/${route} => ${error}`);
  res.statusCode = 500;
  res.send(errorMessage);
}
