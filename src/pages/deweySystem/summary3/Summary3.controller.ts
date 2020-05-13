import express from 'express';

import { genericErrorHandle } from 'utils/httpHelpers/controller';
import { Result, DropdownListModel } from 'types/generic.type';
import {
  deleteAction,
  updateOrAddActionCreator
} from 'utils/httpHelpers/genericCrud';

import summary3Repo, { getSelectList } from './Summary3.repo';
import {
  TableDeweySummary3Schema,
  DeweySummary3Schema,
  deweySummary3SchemaArray
} from './Summary3.type';

const handleErr = genericErrorHandle('Summary3');
const router = express.Router();
const addOrUpdate = updateOrAddActionCreator<DeweySummary3Schema>(
  deweySummary3SchemaArray,
  'Summary3',
  'dewey_summary_3_id',
  summary3Repo.addOrUpdate
);

router.get('/', async (req, res) => {
  const summary3Result = await summary3Repo.getAll();
  const result: Result<TableDeweySummary3Schema[]> = {
    result: summary3Result
  };
  res.send(result);
});

router.post('/', async (req, res) => {
  addOrUpdate(req, res, 'POST');
});

router.put('/', async (req, res) => {
  addOrUpdate(req, res, 'PUT');
});

router.delete('/', async (req, res) => {
  deleteAction<DeweySummary3Schema>(
    req,
    res,
    'dewey_summary_3_id',
    'DeweySummary3',
    summary3Repo.deleteRow
  );
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
      `Error during a GET for the decimals dropdown List, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

export default router;
