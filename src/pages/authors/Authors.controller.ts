import express from 'express';
import authorsRepo from './Authors.repo';
import { TableAuthorSchema } from './Authors.type';
import { Result } from 'types/generic.type';

const router = express.Router();

router.get('/', async (req, res) => {
  const authorsResult = await authorsRepo.getAll();
  const result: Result<TableAuthorSchema[]> = {
    result: authorsResult
  };
  res.send(result);
});

export default router;
