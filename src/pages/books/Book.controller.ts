import express, { Request, Response } from 'express';
import { pick } from 'lodash';

import log from 'utils/logger';
import { Result, DropdownListModel } from 'types/generic.type';
import { genericErrorHandle } from 'utils/httpHelpers/controller';

import bookRepo, { getBookByCallNumber, getBooksSelectList } from './Book.repo';
import {
  GetBookCallNumberModel,
  TableBookSchema,
  BookSchema,
  bookSchemaArray
} from './Book.type';

const router = express.Router();
const errorHandler = genericErrorHandle('Book');

router.get('/', async (req, res) => {
  const bookResult = await bookRepo.getAll();
  const result: Result<TableBookSchema[]> = {
    result: bookResult
  };
  res.send(result);
});

async function addOrUpdateTeacherFunction(
  req: Request,
  res: Response,
  method: 'PUT' | 'POST'
) {
  const bookParams = pick(req.body, bookSchemaArray);
  try {
    bookParams.book_id =
      Number(bookParams.book_id) <= 0 ? undefined : bookParams.book_id;

    const bookResult = await bookRepo.addOrUpdate(bookParams as BookSchema);
    const result: Result<boolean> = {
      message: `Successfully ${bookResult} ${bookParams.name}.`,
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
  const deleteObject = {
    book_id: req.body.id as number
  };
  try {
    const deleteResult = await bookRepo.deleteRow(
      (deleteObject as unknown) as BookSchema
    );
    const result: Result<boolean> = {
      message: deleteResult
        ? 'Successfully deleted your book.'
        : 'There was an error deleting your book.',
      result: deleteResult
    };
    res.send(result);
  } catch (error) {
    errorHandler(
      '/',
      error,
      res,
      `Error during a DELETE for a book, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

router.post('/bycallnumber', async (req, res) => {
  try {
    const callnumber = req.body.callnumber;
    if (!callnumber) {
      const result: Result<any> = {
        result: null,
        message: 'No callnumber was provided.'
      };
      return res.send(result);
    }
    const callnumberResult = await getBookByCallNumber(callnumber);
    const result: Result<GetBookCallNumberModel> = {
      result: callnumberResult
    };
    return res.send(result);
  } catch (error) {
    log.error(error);
    const result: Result<GetBookCallNumberModel[]> = {
      result: [],
      message: 'There was an error loading your book'
    };
    return res.send(result);
  }
});

router.get('/dropdownlist', async (req, res) => {
  try {
    const list = await getBooksSelectList();
    const result: Result<DropdownListModel[]> = {
      result: list
    };
    res.send(result);
  } catch (error) {
    errorHandler(
      '/',
      error,
      res,
      `Error during a GET for a book dropdown list[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

export default router;
