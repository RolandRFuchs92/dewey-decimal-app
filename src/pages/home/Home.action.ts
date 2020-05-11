import { Dispatch } from 'redux';

import { formatDate } from 'appSettings.json';
import format from 'date-fns/format/index.js';
import { ScansModel } from 'pages/booksOut/Booksout.type';
import { ProcessedScansModel } from './Home.type';
import store from 'utils/redux/store';

import {
  IndicatorActionTypes,
  UpdateCheckinAndCheckoutCountAction
} from './Home.type';
import { getScans } from 'pages/booksOut/Booksout.service';

function genericAction(type: IndicatorActionTypes) {
  return function(payload: number) {
    return {
      type,
      payload
    };
  };
}

export const setBirthdayIndicator = genericAction('BIRTHDAYS_TODAY');
export const setBooksOverdueIndicator = genericAction('BOOKS_OVERDUE');
export const setCheckoutsToday = genericAction('CHECKOUTS_COUNT_TODAY');
export const setCheckinsToday = genericAction('CHECKINS_COUNT_TODAY');

export const setCheckinsAndCheckoutsToday = (
  scansResult: ProcessedScansModel
): UpdateCheckinAndCheckoutCountAction => {
  return {
    type: 'UPDATE_SCANS',
    payload: scansResult
  };
};

export const initializeIndicators = () => async (dispatch: Dispatch) => {
  const results = await getScans();
  if (!results.result) return;

  const scans = results.result;
  const today = format(new Date(), formatDate.from);
  const checkoutResults = scans
    ? scans.filter(x => x.check_out_date.toString() === today)
    : [];
  const checkinResults = scans
    ? scans.filter(x => x.check_in_date && x.check_in_date.toString() === today)
    : [];

  const checkoutCount = checkoutResults.length;
  const checkinCount = checkinResults.length;

  const processResult: ProcessedScansModel = {
    checkoutResults,
    checkoutCount,
    checkinResults,
    checkinCount
  };

  const checkinAndOutCountAction = setCheckinsAndCheckoutsToday(processResult);
  dispatch(checkinAndOutCountAction);
};

export default {
  setBirthdayIndicator,
  setBooksOverdueIndicator,
  setCheckinsToday,
  setCheckoutsToday
};
