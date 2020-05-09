import express from 'express';

import log from 'utils/logger';
import { DropdownListModel, Result } from 'types/generic.type';
import { genericErrorHandle } from 'utils/httpHelpers/controller';
import { pick } from 'lodash';

import {
  getSelectList,
  getClasses,
  hideClass,
  addOrUpdateClass
} from './Class.repo';
import { TableClassSchema, ClassSchema } from './Class.type';

const handleErr = genericErrorHandle('class');
const router = express.Router();

router.get('/', async (req, res) => {
  const classResult = await getClasses();
  const result: Result<TableClassSchema[]> = {
    result: classResult
  };

  res.send(result);
});

router.delete('/', async (req, res) => {
  const classId = req.body.id;
  if (!classId)
    res.send({
      message: 'Please provide an Id number',
      result: false
    } as Result<boolean>);

  try {
    const classResult = await hideClass(classId);
    const result: Result<boolean> = {
      message: '',
      result: classResult
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `There was an error while deleting class[${classId}]`
    );
  }
});

router.post('/', async (req, res) => {
  const pickArray: Array<keyof ClassSchema> = [
    'class_id',
    'class_name',
    'grade',
    'is_active'
  ];
  const classObj = pick(req.body, pickArray);
  if (!classObj.class_name || !classObj.grade) {
    res.statusCode = 400;
    res.send({
      message: 'Missing class name or grade.',
      result: false
    } as Result<boolean>);
  }
  try {
    if (classObj.class_id) classObj.class_id = null;

    await addOrUpdateClass(classObj);
    const result: Result<boolean> = {
      message: 'Successfully added a new class',
      result: true
    };
    res.send(result);
  } catch (error) {
    handleErr(
      '/',
      error,
      res,
      `There was an error while doing a POST for a new class [${JSON.stringify(
        classObj
      )}]`
    );
  }
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
