import { setError } from "pages/admin/errors/ErrorReport.action";
import { errorLogErrorsCount } from "pages/admin/errors/ErrorReport.service";
import { Dispatch, AnyAction } from "redux";

import {
  countBooksCheckedOutToday,
  countBooksCheckedInToday,
  countBooksOverdue
} from "pages/booksOut/booksout.repo";
import homeActions from "pages/home/Home.action.js";

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
  () => 0 // TODO
);

export async function loadInitialAppState(dispatch: Dispatch) {
  return await Promise.all([
    loadErrors(dispatch),
    loadCheckoutsToday(dispatch),
    loadCheckinsToday(dispatch),
    loadBooksOverdue(dispatch),
    loadBirthdaysToday(dispatch)
  ]);
}
