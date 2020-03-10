import { setError } from "pages/admin/errors/ErrorReport.action";
import { errorLogErrorsCount } from "pages/admin/errors/ErrorReport.service";

import {
  countBooksCheckedOutToday,
  countBooksCheckedInToday,
  countBooksOverdue
} from "pages/booksOut/booksout.repo";
import homeActions from "pages/home/Home.action.js";

async function loadErrors(dispatch) {
  try {
    const errorCount = await errorLogErrorsCount();
    dispatch(setError(errorCount));
  } catch (error) {
    console.log(error);
  }
}

function genericHomeCount(action, getter) {
  return async dispatch => {
    const countResult = await getter();
    dispatch(action(countResult));
    return Promise.resolve();
  };
}

const loadCheckoutsToday = genericHomeCount(
  homeActions.setCheckoutsToday,
  countBooksCheckedOutToday
);
const loadCheckinsToday = genericHomeCount(
  homeActions.setCheckinsToday,
  countBooksCheckedInToday
);
const loadBooksOverdue = genericHomeCount(
  homeActions.setBooksOverdueIndicator,
  countBooksOverdue
);
const loadBirthdaysToday = genericHomeCount(
  homeActions.setBirthdayIndicator,
  () => {}
);

export async function loadInitialAppState(dispatch) {
  return await Promise.all([
    loadErrors(dispatch),
    loadCheckoutsToday(dispatch),
    loadCheckinsToday(dispatch),
    loadBooksOverdue(dispatch),
    loadBirthdaysToday(dispatch)
  ]);
}
