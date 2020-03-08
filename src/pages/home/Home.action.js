// @flow

import Constants from './Home.constants.js'


function genericAction(type) {
    return function(payload){
        type,
        payload
    }   
}

CHECKOUTS_TODAY,
CHECKINS_TODAY,
BIRTHDAYS_TODAY,
BOOKS_OVERDUE


export const setBirthdayIndicator = genericAction(Constants.BIRTHDAYS_TODAY);
export const setBooksOverdueIndicator = genericAction(Constants.BOOKS_OVERDUE);
export const setCheckoutsToday = genericAction(Constants.CHECKOUTS_TODAY);
export const setCheckinsToday = genericAction(Constants.CHECKIN_TODAY);

export default {
    setBirthdayIndicator,
    setBooksOverdueIndicator,
    setCheckinsToday,
    setCheckoutsToday
}