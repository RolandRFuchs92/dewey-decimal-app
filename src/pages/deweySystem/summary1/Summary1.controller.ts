import express, { Request, Response } from 'express';
import { pick } from 'lodash';

import summary1Repo, { getSelectList } from './Summary1.repo';
import { genericErrorHandle } from 'utils/httpHelpers/controller';

import {
  TableDeweySummarySchema,
  DeweySummarySchemaArray
} from './Summary1.type';
import { Result, DropdownListModel } from 'types/generic.type';

const router = express.Router();
const handleErr = genericErrorHandle('Summary1');

router.get('/', async (req, res) => {
  const summaryResult = await summary1Repo.getAll();
  const result: Result<TableDeweySummarySchema[]> = {
    result: summaryResult
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
    DeweySummarySchemaArray
  ) as TableDeweySummarySchema;

  try {
    decimalParams.dewey_summary_id =
      Number(decimalParams.dewey_summary_id) <= 0
        ? undefined
        : decimalParams.dewey_summary_id;

    const bookResult = await summary1Repo.addOrUpdate(decimalParams);
    const result: Result<boolean> = {
      message: `Successfully ${bookResult} ${decimalParams.name}.`,
      result: true
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `Error during a ${method} for a Dewey summary, params[${JSON.stringify(
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

router.delete('/', async (req, res) => {
  const deleteObject = {
    dewey_summary_id: req.body.id as number
  };
  try {
    const deleteResult = await summary1Repo.deleteRow(
      (deleteObject as unknown) as TableDeweySummarySchema
    );
    const result: Result<boolean> = {
      message: deleteResult
        ? 'Successfully deleted this Dewey summary reference.'
        : 'There was an error deleting your Dewey summary reference.',
      result: deleteResult
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `Error during a DELETE for a Dewey summary, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

router.get('/dropdownlist', async (req, res) => {
  try {
    const decimalDropdownList = await getSelectList();
    const result: Result<DropdownListModel[]> = {
      result: decimalDropdownList
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `Error during a GET for the Summary1 dropdown List, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

export default router;
