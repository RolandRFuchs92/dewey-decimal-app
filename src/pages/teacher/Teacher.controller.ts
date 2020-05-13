import express, { Request, Response } from 'express';
import { Result } from 'types/generic.type';
import { genericErrorHandle } from 'utils/httpHelpers/controller';

import {
  getTeachers,
  createOrUpdateTeacher,
  deleteTeacher
} from './Teacher.repo';
import {
  TableTeacherSchema,
  TeacherSchema,
  teacherSchemaArray
} from './Teacher.type';
import { pick } from 'lodash';

const router = express.Router();
const errorHandler = genericErrorHandle('Teacher');

router.get('/', async (req, res) => {
  const teacherResult = await getTeachers();
  const result: Result<TableTeacherSchema[]> = {
    result: teacherResult
  };
  res.send(result);
});

async function addOrUpdateTeacherFunction(
  req: Request,
  res: Response,
  method: 'PUT' | 'POST'
) {
  const teacherParams: TeacherSchema = pick(req.body, teacherSchemaArray);
  try {
    teacherParams.teacher_id =
      Number(teacherParams.teacher_id) <= 0
        ? undefined
        : teacherParams.teacher_id;

    const teacherResult = await createOrUpdateTeacher(teacherParams);
    const result: Result<boolean> = {
      message: `Successfully ${teacherResult} ${teacherParams.first_name} ${teacherParams.last_name}.`,
      result: true
    };
    res.send(result);
  } catch (error) {
    errorHandler(
      '/',
      error,
      res,
      `Error during a ${method} for a teacher, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
}

router.post('/', async (req, res) => {
  addOrUpdateTeacherFunction(req, res, 'POST');
});

router.put('/', async (req, res) => {
  addOrUpdateTeacherFunction(req, res, 'PUT');
});

router.delete('/', async (req, res) => {
  const id = req.body.id;
  try {
    const deleteResult = await deleteTeacher(id);
    const result: Result<boolean> = {
      message: 'Successfully deleted a teacher.',
      result: deleteResult
    };
    res.send(result);
  } catch (error) {
    errorHandler(
      '/',
      error,
      res,
      `Error during a DELETE for a teacher, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

export default router;
