import express from 'express';
import log from 'utils/logger';
import { DropdownListModel, Result } from 'types/generic.type';

import { getSelectList } from './Class.repo';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('get received');
});

router.get('/dropdownlist', async (req, res) => {
  try {
    const dropdownListResult = await getSelectList();
    const result: Result<DropdownListModel[]> = {
      result: dropdownListResult
    };
    res.send(result);
  } catch (error) {
    log.error(error);
    res.status(500);
    const result: Result<any[]> = {
      message: 'There was an error getting the dropdown list.'
    };
    res.send(result);
  }
});

export default router;
