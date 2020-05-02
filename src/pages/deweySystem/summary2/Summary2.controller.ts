import express from 'express';

import summary2Repo from './Summary2.repo';
import { TableDeweySummary2Schema } from './Summary2.type';
import { Result } from 'types/generic.type';

const router = express.Router();

router.get('/', async (req, res) => {
  const summary2Result = await summary2Repo.getAll();

  const result: Result<TableDeweySummary2Schema[]> = {
    result: summary2Result
  };
  res.send(result);
});

export default router;
