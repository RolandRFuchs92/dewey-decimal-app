import express from 'express';

import decimalRepo from './Decimal.repo';
import { TableDeweyDecimalSchema } from './Decimal.type';
import { Result } from 'types/generic.type';

const router = express.Router();

router.get('/', async (req, res) => {
  const decimalResult = await decimalRepo.getAll();

  const result: Result<TableDeweyDecimalSchema[]> = {
    result: decimalResult
  };
  res.send(result);
});

export default router;
