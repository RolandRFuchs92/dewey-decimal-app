import axios from 'axios';
import { Dispatch } from 'redux';
import { setError } from 'pages/admin/errors/ErrorReport.action';
// import { errorLogErrorsCount } from 'pages/admin/errors/ErrorReport.service';

import { countCheckouts, countCheckins } from 'pages/booksOut/Booksout.service';
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
  // const booksOverdue = //countBooksOverdue();
  const checkinsToday = countCheckins();
  const checkoutsToday = countCheckouts();
  // const birthdaysToday = countStudentsWithBirthdayToday();

  const payload: HomeReducerModel = {
    booksOverdue: 0, // +((await booksOverdue)?.count || 0),
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
