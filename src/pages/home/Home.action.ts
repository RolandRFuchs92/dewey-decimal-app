import { IndicatorActionTypes } from './Home.type';

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
export const setCheckoutsToday = genericAction('CHECKOUTS_TODAY');
export const setCheckinsToday = genericAction('CHECKINS_TODAY');

export default {
  setBirthdayIndicator,
  setBooksOverdueIndicator,
  setCheckinsToday,
  setCheckoutsToday
};
