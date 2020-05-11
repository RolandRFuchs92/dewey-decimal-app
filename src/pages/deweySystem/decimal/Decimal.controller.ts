import express from 'express';

import decimalRepo, { getSelectList } from './Decimal.repo';
import { TableDeweyDecimalSchema } from './Decimal.type';
import { Result, DropdownListModel } from 'types/generic.type';
import { genericErrorHandle } from 'utils/httpHelpers/controller';

const router = express.Router();
const handleErr = genericErrorHandle('Decimal');

router.get('/', async (req, res) => {
  const decimalResult = await decimalRepo.getAll();

  const result: Result<TableDeweyDecimalSchema[]> = {
    result: decimalResult
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
