import express, { Request, Response } from 'express';
import { pick } from 'lodash';

import decimalRepo, { getSelectList } from './Decimal.repo';
import {
  TableDeweyDecimalSchema,
  decimalSchemaArray,
  DeweyDecimalSchema
} from './Decimal.type';
import { Result, DropdownListModel } from 'types/generic.type';
import { genericErrorHandle } from 'utils/httpHelpers/controller';

const router = express.Router();
const errorHandler = genericErrorHandle('Decimal');

router.get('/', async (req, res) => {
  const decimalResult = await decimalRepo.getAll();

  const result: Result<TableDeweyDecimalSchema[]> = {
    result: decimalResult
  };
  res.send(result);
});

async function addOrUpdateTeacherFunction(
  req: Request,
  res: Response,
  method: 'PUT' | 'POST'
) {
  const decimalParams = pick(
    req.body,
    decimalSchemaArray
  ) as TableDeweyDecimalSchema;

  try {
    decimalParams.dewey_decimal_id =
      Number(decimalParams.dewey_decimal_id) <= 0
        ? undefined
        : decimalParams.dewey_decimal_id;

    const bookResult = await decimalRepo.addOrUpdate(decimalParams);
    const result: Result<boolean> = {
      message: `Successfully ${bookResult} ${decimalParams.name}.`,
      result: true
    };
    res.send(result);
  } catch (error) {
    errorHandler(
      '/',
      error,
      res,
      `Error during a ${method} for a Decimal, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
}

router.post('/', async (req, res) => {
  addOrUpdateTeacherFunction(req, res, 'POST');
});

router.put('/', async (req, res) => {
  addOrUpdateTeacherFunction(req, res, 'PUT');
});

router.get('/dropdownlist', async (req, res) => {
  try {
    const decimalDropdownList = await getSelectList();
    const result: Result<DropdownListModel[]> = {
      result: decimalDropdownList
    };
    res.send(result);
  } catch (error) {
    errorHandler(
      '/',
      error,
      res,
      `Error during a GET for the decimals dropdown List, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

export default router;
