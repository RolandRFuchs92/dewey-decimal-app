import { setError } from 'pages/admin/errors/ErrorReport.action';
import { errorLogErrorsCount } from 'pages/admin/errors/ErrorReport.service';
import { Dispatch, AnyAction } from 'redux';

import {
  countBooksCheckedOutToday,
  countBooksCheckedInToday,
  countBooksOverdue
} from 'pages/booksOut/Booksout.repo';
import { countStudentsWithBirthdayToday } from 'pages/student/Student.repo';
import {
  HomeReducerModel,
  FullIndicatorActionModel
} from 'pages/home/Home.type';

async function loadErrors(dispatch: Dispatch) {
  try {
    const errorCount = (await errorLogErrorsCount()) as number;
    dispatch(setError(errorCount));
  } catch (error) {
    console.log(error);
  }
}

export async function loadInitialAppState(dispatch: Dispatch) {
  const booksOverdue = countBooksOverdue();
  const checkinsToday = countBooksCheckedInToday();
  const checkoutsToday = countBooksCheckedOutToday();
  const birthdaysToday = countStudentsWithBirthdayToday();

  const payload: HomeReducerModel = {
    booksOverdue: +((await booksOverdue) || 0),
    checkinsToday: +((await checkinsToday) || 0),
    checkoutsToday: +((await checkoutsToday) || 0),
    birthdaysToday: +((await birthdaysToday) || 0)
  };

  const dispatchData: FullIndicatorActionModel = {
    type: 'ALL_INDICATORS',
    payload
  };

  dispatch(dispatchData);
}
