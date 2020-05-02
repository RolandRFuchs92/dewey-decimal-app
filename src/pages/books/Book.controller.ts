import express from 'express';
import log from 'utils/logger';
import bookRepo, { getBookByCallNumber } from './Book.repo';
import { Result } from 'types/generic.type';
import { GetBookCallNumberModel, TableBookSchema } from './Book.type';

const router = express.Router();

router.get('/', async (req, res) => {
  const bookResult = await bookRepo.getAll();
  const result: Result<TableBookSchema[]> = {
    result: bookResult
  };
  res.send(result);
});

router.post('/', async (req, res) => {
  res.send('Post root');
});

router.put('/', async (req, res) => {
  res.send('Put root');
});

router.delete('/', async (req, res) => {
  res.send('DELETE root');
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

export default router;
