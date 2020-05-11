import express from 'express';

import { genericErrorHandle } from 'utils/httpHelpers/controller';
import { Result, DropdownListModel } from 'types/generic.type';

import summary3Repo, { getSelectList } from './Summary3.repo';
import { TableDeweySummary3Schema } from './Summary3.type';

const handleErr = genericErrorHandle('Summary3');

const router = express.Router();

router.get('/', async (req, res) => {
  const summary3Result = await summary3Repo.getAll();
  const result: Result<TableDeweySummary3Schema[]> = {
    result: summary3Result
  };
  res.send(result);
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
