import express from 'express';

import { Result } from 'types/generic.type';

import summary3Repo from './Summary3.repo';
import { TableDeweySummary3Schema } from './Summary3.type';

const router = express.Router();

router.get('/', async (req, res) => {
  const summary3Result = await summary3Repo.getAll();
  const result: Result<TableDeweySummary3Schema[]> = {
    result: summary3Result
  };
  res.send(result);
});

export default router;
