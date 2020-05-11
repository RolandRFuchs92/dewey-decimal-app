import express, { Request, Response } from 'express';
import authorsRepo, { getSelectList } from './Authors.repo';
import { TableAuthorSchema, AuthorSchema } from './Authors.type';
import { Result, DropdownListModel } from 'types/generic.type';
import { genericErrorHandle } from 'utils/httpHelpers/controller';
import { pick } from 'lodash';

const router = express.Router();
const handleErr = genericErrorHandle('Author');

router.get('/', async (req, res) => {
  const authorsResult = await authorsRepo.getAll();
  const result: Result<TableAuthorSchema[]> = {
    result: authorsResult
  };
  res.send(result);
});

async function addOrUpdateClassSharedFunction(req: Request, res: Response) {
  const pickArray: Array<keyof AuthorSchema> = [
    'author_id',
    'name',
    'second_name',
    'surname'
  ];
  const authorObj = pick(req.body, pickArray) as AuthorSchema;
  if (!authorObj.name || !authorObj.surname) {
    res.statusCode = 400;
    res.send({
      message: 'Missing class name or grade.',
      result: false
    } as Result<boolean>);
  }
  try {
    authorObj.author_id =
      Number(authorObj.author_id) === 0
        ? undefined
        : Number(authorObj.author_id);

    var addOrUpdate = await authorsRepo.addOrUpdate(authorObj);
    const result: Result<string> = {
      message: `Successfully ${addOrUpdate} Author - ${authorObj.name} ${authorObj.surname}.`
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `There was an error while doing a PUT or POST for a class params[${JSON.stringify(
        authorObj
      )}]`
    );
  }
}

router.post('/', async (req, res) => {
  addOrUpdateClassSharedFunction(req, res);
});

router.put('/', async (req, res) => {
  addOrUpdateClassSharedFunction(req, res);
});

router.delete('/', async (req, res) => {
  const deleteObject = { author_id: req.body.id };
  try {
    const deleteResult = await authorsRepo.deleteRow(
      deleteObject as AuthorSchema
    );
    const result: Result<boolean> = {
      message: deleteResult
        ? 'Successfully deleted your book.'
        : 'There was an error deleting your book.',
      result: deleteResult
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `Error during a DELETE for an Author, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

router.get('/dropdownlist', async (req, res) => {
  try {
    const dropdownList = await getSelectList();
    const result: Result<DropdownListModel[]> = {
      result: dropdownList
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `Error during a GET for an Author dropdown List, params[${JSON.stringify(
        req.body,
        null,
        2
      )}]`
    );
  }
});

export default router;
