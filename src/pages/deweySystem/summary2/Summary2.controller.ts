import express from 'express';
import { genericErrorHandle } from 'utils/httpHelpers/controller';

import summary2Repo, { getSelectList } from './Summary2.repo';
import { TableDeweySummary2Schema } from './Summary2.type';
import { Result, DropdownListModel } from 'types/generic.type';

const router = express.Router();
const handleErr = genericErrorHandle('Summary3');

router.get('/', async (req, res) => {
  const summary2Result = await summary2Repo.getAll();

  const result: Result<TableDeweySummary2Schema[]> = {
    result: summary2Result
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
      `Error during a GET for the Summary2 dropdown List, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

export default router;
