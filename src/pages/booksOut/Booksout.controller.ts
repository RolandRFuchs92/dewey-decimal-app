import express from 'express';

import { genericErrorHandle, queryDate } from 'utils/httpHelpers/controller';

import {
  countBooksCheckedInToday,
  countBooksCheckedOutToday,
  countBooksOverdue,
  getBooksOverdue,
  getScans,
  checkout,
  getStudentRecentlyCheckoutBook
} from './Booksout.repo';

const router = express.Router();
const errorHandler = genericErrorHandle('booksout');

router.get('/checkoutscount', async (req, res) => {
  try {
    const result = await countBooksCheckedOutToday();
    res.send(result);
  } catch (error) {
    errorHandler(
      'checkouts',
      error,
      res,
      'There was an error collecting checkout count.'
    );
  }
});

router.get('/checkinscount', async (req, res) => {
  try {
    const result = await countBooksCheckedInToday();
    res.send(result);
  } catch (error) {
    errorHandler(
      'checkinscount',
      error,
      res,
      'There was an error collecting checkins count.'
    );
  }
});

router.get('/overduecount', async (req, res) => {
  try {
    const date = queryDate(req);
    const result = await countBooksOverdue(date as Date);
    res.send(result);
  } catch (error) {
    errorHandler(
      'overduecount',
      error,
      res,
      'There was an error collecting overdue books count.'
    );
  }
});

router.get('/overdue', async (req, res) => {
  try {
    const date = queryDate(req);
    const result = await getBooksOverdue((date as unknown) as Date);
    res.send(result);
  } catch (error) {
    errorHandler(
      'overdue',
      error,
      res,
      'There was an error collecting overdue books.'
    );
  }
});

//checking out
//returns model representing duedate and student
router.post('/', async (req, res) => {
  try {
    const { student_id, book_id } = req.body;
    await checkout(student_id, book_id);
    const result = await getStudentRecentlyCheckoutBook(student_id, book_id);
    res.send(result);
  } catch (error) {
    errorHandler(
      'PUT',
      error,
      res,
      'There was an error when checking out a book.'
    );
  }
});

//Checking in
router.put('/', async (req, res) => {
  try {
    res.send();
  } catch (error) {
    errorHandler(
      'POST',
      error,
      res,
      'There was an error when checking in a book.'
    );
  }
});

router.get('/scans', async (req, res) => {
  try {
    const date = queryDate(req);
    const result = await getScans(date as Date);
    res.send(result);
  } catch (error) {
    errorHandler('scans', error, res, 'There was an error collecting scans.');
  }
});

export default router;
