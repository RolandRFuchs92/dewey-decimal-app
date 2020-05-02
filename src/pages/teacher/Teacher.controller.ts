import express from 'express';
import { Result } from 'types/generic.type';

import { getTeachers } from './Teacher.repo';
import { TableTeacherSchema } from './Teacher.type';

const router = express.Router();

router.get('/', async (req, res) => {
  const teacherResult = await getTeachers();
  const result: Result<TableTeacherSchema[]> = {
    result: teacherResult
  };
  res.send(result);
});

export default router;
