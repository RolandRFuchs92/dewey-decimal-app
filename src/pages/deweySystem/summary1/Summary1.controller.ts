import express from 'express';
import summary1Repo from './Summary1.repo';
import { TableDeweySummarySchema } from './Summary1.type';
import { Result } from 'types/generic.type';

const router = express.Router();

router.get('/', async (req, res) => {
  const summaryResult = await summary1Repo.getAll();
  const result: Result<TableDeweySummarySchema[]> = {
    result: summaryResult
  };

  res.send(result);
});

export default router;
