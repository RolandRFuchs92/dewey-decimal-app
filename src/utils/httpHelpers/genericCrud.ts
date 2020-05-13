import { Request, Response } from 'express';
import { pick } from 'lodash';

import { genericErrorHandle } from 'utils/httpHelpers/controller';
import { Result } from 'types/generic.type';

export default () => {};

export function updateOrAddActionCreator<TSchema>(
  schemaArray: (keyof TSchema)[],
  route: string,
  pk: keyof TSchema,
  addOrUpdateMethod: (val: TSchema) => Promise<'added' | 'updated'>
) {
  return async function(req: Request, res: Response, method: 'PUT' | 'POST') {
    updateOrAddAction<TSchema>(
      req,
      res,
      method,
      schemaArray,
      route,
      pk,
      addOrUpdateMethod
    );
  };
}

export async function updateOrAddAction<TSchema>(
  req: Request,
  res: Response,
  method: 'PUT' | 'POST',
  schemaArray: (keyof TSchema)[],
  route: string,
  pk: keyof TSchema,
  addOrUpdateMethod: (val: TSchema) => Promise<'added' | 'updated'>
) {
  const handleErr = genericErrorHandle(route);
  const entity = pick(req.body, schemaArray) as TSchema;

  try {
    // @ts-ignore
    entity[pk] = Number(entity[pk]) <= 0 ? undefined : entity[pk];

    const bookResult = await addOrUpdateMethod(entity);
    const result: Result<boolean> = {
      message: `Successfully ${bookResult} item.`,
      result: true
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `Error during a ${method} for a ${route}, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
}

export async function deleteAction<TTableSchema>(
  req: Request,
  res: Response,
  pk: keyof TTableSchema,
  route: string,
  deleteMethod: (deleteBody: TTableSchema) => Promise<boolean>
) {
  const handleErr = genericErrorHandle(route);
  const deleteObject = {
    [pk]: req.body.id as number
  };
  try {
    const deleteResult = await deleteMethod(
      (deleteObject as unknown) as TTableSchema
    );
    const result: Result<boolean> = {
      message: deleteResult
        ? `Successfully deleted this ${route} reference.`
        : `There was an error deleting your ${route} reference.`,
      result: deleteResult
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `Error during a DELETE for a table with principal key[${route}], params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
}
