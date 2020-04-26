import express, { Response } from 'express';
import { pick } from 'lodash';
import log from 'utils/logger';
import { parse } from 'date-fns';

import stud, {
  getSelectList,
  getStudentProfileData,
  getStudentsWithBirthdays,
  countStudentsWithBirthdayToday,
  getStudentSelectListSearch
} from 'pages/student/Student.repo';
import { studentSchemaKeys, StudentModel } from './Student.type';

const router = express.Router();

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
    const result = await stud.deleteRow((body as unknown) as StudentModel);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get('/', async (req, res) => {
  debugger;
  try {
    const result = await stud.getAll();
    res.send(result);
  } catch (error) {
    genericErrorHandle('', error, res, 'Error collecting student data');
  }
});

router.get('/studentdropdown', (req, res) => {
  getSelectList().then(studentList => res.send(studentList));
});

router.get('/profiledata', (req, res) => {
  const studentId = req.query.student_id;
  if (!studentId) {
    res.status(400);
    return res.send({ message: 'No student id was provided.' });
  }

  getStudentProfileData(studentId.toString()).then(result => res.send(result));
});

router.get('/birthdays', (req, res) => {
  const date = req.query.date && req.query.date.toString();
  getStudentsWithBirthdays(date).then(result => res.send(result));
});

router.get('/birthdayscount', async (req, res) => {
  try {
    const date =
      req.query.date &&
      parse(req.query.date.toString(), 'yyyy-MM-dd', new Date());
    const result = await countStudentsWithBirthdayToday(date as Date);
    console.log(result);
    res.send(result);
  } catch (error) {
    log.error(`There was an error at /students/birthdayscount => ${error}`);
    res.statusCode = 500;
    res.send('Error getting birthday count.');
  }
});

router.get('/studentSearch', async (req, res) => {
  const namePart = req.query.namepart;
  try {
    const result = await getStudentSelectListSearch(namePart.toString());
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

function genericErrorHandle(
  route: string,
  error: Error,
  res: Response<any>,
  errorMessage: string
) {
  log.error(`There was an error at /student/${route} => ${error}`);
  res.statusCode = 500;
  res.send(errorMessage);
}

export default router;
