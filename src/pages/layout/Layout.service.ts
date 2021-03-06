import axios from 'axios';
import { Dispatch } from 'redux';
import { setError } from 'pages/admin/errors/ErrorReport.action';
// import { errorLogErrorsCount } from 'pages/admin/errors/ErrorReport.service';

import { getBirthdaysTodayCount } from 'pages/student/Student.service';
import {
  countCheckouts,
  countCheckins,
  countOverdueBooks
} from 'pages/booksOut/Booksout.service';
import {
  HomeReducerCountOnly,
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
  const birthdaysToday = getBirthdaysTodayCount();

  const payload: HomeReducerCountOnly = {
    booksOverdue: (await booksOverdue).result!.count,
    checkinCountForToday: (await checkinsToday).result!.count,
    checkoutCountForToday: (await checkoutsToday).result!.count,
    birthdaysToday: (await birthdaysToday).result!.count
  };

  const dispatchData: FullIndicatorActionModel = {
    type: 'ALL_INDICATORS',
    payload
  };

  dispatch(dispatchData);
}
