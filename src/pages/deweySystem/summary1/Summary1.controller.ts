import express from 'express';
import summary1Repo, { getSelectList } from './Summary1.repo';
import { genericErrorHandle } from 'utils/httpHelpers/controller';

import { TableDeweySummarySchema } from './Summary1.type';
import { Result, DropdownListModel } from 'types/generic.type';

const router = express.Router();
const handleErr = genericErrorHandle('Summary3');

router.get('/', async (req, res) => {
  const summaryResult = await summary1Repo.getAll();
  const result: Result<TableDeweySummarySchema[]> = {
    result: summaryResult
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
      `Error during a GET for the Summary1 dropdown List, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

export default router;
