import express from 'express';

import { genericErrorHandle } from 'utils/httpHelpers/controller';
import { Result, DropdownListModel } from 'types/generic.type';
import { deleteAction, updateOrAddAction } from 'utils/httpHelpers/genericCrud';

import summary2Repo, { getSelectList } from './Summary2.repo';
import {
  TableDeweySummary2Schema,
  DeweySummary2Schema,
  deweySummary2SchemaArray
} from './Summary2.type';

const router = express.Router();
const handleErr = genericErrorHandle('Summary3');

router.get('/', async (req, res) => {
  const summary2Result = await summary2Repo.getAll();

  const result: Result<TableDeweySummary2Schema[]> = {
    result: summary2Result
  };
  res.send(result);
});

router.post('/', async (req, res) => {});

router.put('/', async (req, res) => {
  updateOrAddAction<DeweySummary2Schema>(
    req,
    res,
    'PUT',
    deweySummary2SchemaArray,
    'Summary2',
    'dewey_summary_2_id',
    summary2Repo.addOrUpdate
  );
});

router.delete('/', async (req, res) => {
  await deleteAction<TableDeweySummary2Schema>(
    req,
    res,
    'dewey_summary_2_id',
    'Summary2',
    summary2Repo.deleteRow
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
      `Error during a GET for the Summary2 dropdown List, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

export default router;
