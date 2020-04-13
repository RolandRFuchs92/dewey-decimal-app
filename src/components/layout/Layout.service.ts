import { Dispatch } from 'redux';
import { setError } from 'pages/admin/errors/ErrorReport.action';
import { errorLogErrorsCount } from 'pages/admin/errors/ErrorReport.service';

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
    booksOverdue: +((await booksOverdue)?.count || 0),
    checkinsToday: +((await checkinsToday)?.count || 0),
    checkoutsToday: +((await checkoutsToday)?.count || 0),
    birthdaysToday: +((await birthdaysToday)?.count || 0)
  };

  const dispatchData: FullIndicatorActionModel = {
    type: 'ALL_INDICATORS',
    payload
  };

  dispatch(dispatchData);
}
