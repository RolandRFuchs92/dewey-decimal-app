import axios from 'axios';
import { Dispatch } from 'redux';
import { setError } from 'pages/admin/errors/ErrorReport.action';
// import { errorLogErrorsCount } from 'pages/admin/errors/ErrorReport.service';

import {
  countCheckouts,
  countCheckins,
  countOverdueBooks
} from 'pages/booksOut/Booksout.service';
import {
  HomeReducerModel,
  FullIndicatorActionModel
} from 'pages/home/Home.type';

async function loadErrors(dispatch: Dispatch) {
  try {
    // const errorCount = (await errorLogErrorsCount()) as number;
    // dispatch(setError(errorCount));
  } catch (error) {}
}

export async function loadInitialAppState(dispatch: Dispatch) {
  const booksOverdue = countOverdueBooks();
  const checkinsToday = countCheckins();
  const checkoutsToday = countCheckouts();
  // const birthdaysToday = countStudentsWithBirthdayToday();

  const payload: HomeReducerModel = {
    booksOverdue: (await booksOverdue).result.count,
    checkinsToday: (await checkinsToday).result.count,
    checkoutsToday: (await checkoutsToday).result.count,
    birthdaysToday: 0 //+((await birthdaysToday)?.count || 0)
  };

  const dispatchData: FullIndicatorActionModel = {
    type: 'ALL_INDICATORS',
    payload
  };

  dispatch(dispatchData);
}
