import {
  IndicatorActionTypes,
  UpdateCheckinAndCheckoutCountAction
} from './Home.type';

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
  checkoutCount: number,
  checkinCount: number
): UpdateCheckinAndCheckoutCountAction => {
  return {
    type: 'UPDATE_CHECKIN_AND_CHECKOUT_COUNTS',
    payload: {
      checkoutCount,
      checkinCount
    }
  };
};

export default {
  setBirthdayIndicator,
  setBooksOverdueIndicator,
  setCheckinsToday,
  setCheckoutsToday
};
