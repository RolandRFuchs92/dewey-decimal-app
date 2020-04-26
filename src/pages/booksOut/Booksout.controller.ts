import express from 'express';
import { pick } from 'lodash';

import { genericErrorHandle, queryDate } from 'utils/httpHelpers/controller';

import booksoutRepo, {
  countBooksCheckedInToday,
  countBooksCheckedOutToday,
  countBooksOverdue,
  getBooksOverdue,
  getScans,
  checkout,
  getStudentRecentlyCheckoutBook,
  checkin
} from './Booksout.repo';
import {
  GetAllModel,
  book_out_keys,
  BooksOverdueModel,
  ScansModel
} from './Booksout.type';
import { Result, CountObj } from 'types/generic.type';

const router = express.Router();
const errorHandler = genericErrorHandle('booksout');

router.get('/', async (req, res) => {
  try {
    const result = await booksoutRepo.getAll();
    res.send(result);
  } catch (error) {
    errorHandler('GET', error, res, 'There was an error getting all booksout.');
  }
});

router.delete('/', async (req, res) => {
  try {
    const deleteBookId = req.body.bookout_id;
    await booksoutRepo.deleteRow({ books_out_id: deleteBookId } as GetAllModel);
    res.send({ result: 'Your book has been deleted.' });
  } catch (error) {
    errorHandler(
      'DELETE',
      error,
      res,
      'There was an error deleteing the book requested.'
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
      'POST',
      error,
      res,
      'There was an error when checking out a book.'
    );
  }
});

//Checking in
router.put('/', async (req, res) => {
  try {
    const bookId = req.body.booksout_id;
    await checkin(bookId);
    res.send({ message: 'This is something i still have to do...' });
  } catch (error) {
    errorHandler(
      'PUT',
      error,
      res,
      'There was an error when checking in a book.'
    );
  }
});

router.post('/addupdate', async (req, res) => {
  try {
    const model = pick(req.body, book_out_keys);
    const result = await booksoutRepo.addOrUpdate(model);
    res.send({ result });
  } catch (error) {
    errorHandler(
      'addupdate',
      error,
      res,
      'There was an error adding or updating your books out request'
    );
  }
});

router.get('/checkoutscount', async (req, res) => {
  try {
    const booksCount = await countBooksCheckedOutToday();
    const result: Result<CountObj> = {
      result: {
        count: booksCount!.count || 0
      }
    };
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
    const checkinCount = await countBooksCheckedInToday();
    const result: Result<CountObj> = {
      result: {
        count: checkinCount!.count || 0
      }
    };
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
    const overdueBooksResult = await countBooksOverdue(date as Date);
    const result: Result<CountObj> = {
      result: {
        count: overdueBooksResult!.count || 0
      }
    };
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
    const overdueBooksResult = await getBooksOverdue((date as unknown) as Date);
    const result: Result<BooksOverdueModel[]> = {
      result: overdueBooksResult
    };
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

router.get('/scans', async (req, res) => {
  try {
    const date = queryDate(req);
    const scansResult = await getScans(date as Date);
    const result: Result<ScansModel[]> = {
      result: scansResult
    };
    res.send(result);
  } catch (error) {
    errorHandler('scans', error, res, 'There was an error collecting scans.');
  }
});

export default router;
