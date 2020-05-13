import { Response, Request } from 'express';
import { parse } from 'date-fns';

import { formatDate } from 'appSettings.json';
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

export function queryDate(req: Request) {
  const date =
    req.query.date &&
    parse(req.query.date.toString(), formatDate.from, new Date());
  return date;
}
