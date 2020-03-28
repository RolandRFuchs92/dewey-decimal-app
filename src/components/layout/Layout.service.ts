import { setError } from 'pages/admin/errors/ErrorReport.action';
import { errorLogErrorsCount } from 'pages/admin/errors/ErrorReport.service';
import { Dispatch, AnyAction } from 'redux';

import {
  countBooksCheckedOutToday,
  countBooksCheckedInToday,
  countBooksOverdue
} from 'pages/booksOut/booksout.repo';
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

function genericHomeCount(
  action: (payload: any) => AnyAction,
  getter: () => Promise<string | number | boolean | null>
) {
  return async (dispatch: Dispatch) => {
    const countResult = await getter();
    dispatch(action(countResult));
    return Promise.resolve();
  };
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
    birthdaysToday: await birthdaysToday
  };

  const dispatchData: FullIndicatorActionModel = {
    type: 'ALL_INDICATORS',
    payload
  };

  dispatch(dispatchData);
}
