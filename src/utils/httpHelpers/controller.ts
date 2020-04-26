import { Response } from 'express';
import log from 'utils/logger';

export default () => {};

export function genericErrorHandle(baseRoute: string) {
  return (
    route: string,
    error: Error,
    res: Response<any>,
    errorMessage: string
  ) => {
    log.error(`There was an error at /${baseRoute}/${route} => ${error}`);
    res.statusCode = 500;
    res.send(errorMessage);
  };
}
