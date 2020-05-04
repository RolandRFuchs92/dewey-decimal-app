import express, { Response } from 'express';
import { pick } from 'lodash';
import { parse } from 'date-fns';

import { formatDate } from 'appSettings.json';
import { genericErrorHandle as baseErrorHandle } from 'utils/httpHelpers/controller';
import stud, {
  getSelectList,
  getStudentProfileData,
  getStudentsWithBirthdays,
  countStudentsWithBirthdayToday,
  getStudentSelectListSearch
} from 'pages/student/Student.repo';
import { DropdownListModel, Result, CountObj } from 'types/generic.type';

import {
  studentSchemaKeys,
  StudentCardProps,
  GetStudentsWithBirthdaysModel,
  StudentSelectListSearchModel,
  TableStudentSchema
} from './Student.type';

const router = express.Router();
const genericErrorHandle = baseErrorHandle('student');

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const studentModel = pick(body, studentSchemaKeys);

    if (Object.keys(studentModel).length <= 1) res.send('nothing');

    const result = await stud.addOrUpdate(studentModel);
    console.log('got here');
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/', async (req, res) => {
  try {
    debugger;
    const body = { student_id: req.body.student_id };
    const result = await stud.deleteRow(
      (body as unknown) as TableStudentSchema
    );
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const getAllResult = await stud.getAll();
    const result: Result<TableStudentSchema[]> = {
      result: getAllResult
    };
    res.send(result);
  } catch (error) {
    genericErrorHandle('', error, res, 'Error collecting student data');
  }
});

router.get('/dropdown', async (req, res) => {
  try {
    const studentResult = await getSelectList();
    const result: Result<DropdownListModel[]> = {
      result: studentResult
    };
    res.send(result);
  } catch (error) {
    genericErrorHandle(
      'dropdown',
      error,
      res,
      'There was an error getting the student dropdown list'
    );
  }
});

router.get('/profile', async (req, res) => {
  const studentId = req.query.student_id;
  if (!studentId) {
    res.status(400);
    return res.send({ message: 'No student id was provided.' });
  }
  try {
    const profileResult = await getStudentProfileData(studentId.toString());
    const result: Result<StudentCardProps> = {
      result: profileResult
    };
    return res.send(result);
  } catch (error) {
    return genericErrorHandle(
      'profile',
      error,
      res,
      'There was an error getting the student model'
    );
  }
});

router.get('/birthdays', async (req, res) => {
  try {
    const date =
      req.query.date &&
      parse(req.query.date.toString(), formatDate.to, new Date());
    const birthdaysResult = await getStudentsWithBirthdays(date as Date);
    const result: Result<GetStudentsWithBirthdaysModel[]> = {
      result: birthdaysResult
    };
    res.send(result);
  } catch (error) {
    const result: Result<any> = {
      result: []
    };
    res.send(result);
  }
});

router.get('/birthdayscount', async (req, res) => {
  try {
    const date =
      req.query.date &&
      parse(req.query.date.toString(), formatDate.to, new Date());
    const birthdaysCountResult = await countStudentsWithBirthdayToday(
      date as Date
    );
    const result: Result<CountObj> = {
      result: {
        count: birthdaysCountResult!.count
      }
    };
    res.send(result);
  } catch (error) {
    const result: Result<CountObj> = {
      result: {
        count: 0
      }
    };
    res.send(result);
  }
});

router.get('/search', async (req, res) => {
  const namePart = req.query.namepart;
  try {
    const searchResult = await getStudentSelectListSearch(namePart.toString());
    const result: Result<StudentSelectListSearchModel[]> = {
      result: searchResult
    };
    res.send(result);
  } catch (error) {
    genericErrorHandle(
      'studentSearch',
      error,
      res,
      'There was an error searching for a student.'
    );
  }
});

export default router;
