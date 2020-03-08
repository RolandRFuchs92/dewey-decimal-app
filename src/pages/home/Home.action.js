// @flow

import Constants from './Home.constants.js'


function genericAction(type: String): Function {
    return function(payload){
        return {
            type,
            payload
        }
    }   
}

export const setBirthdayIndicator = genericAction(Constants.BIRTHDAYS_TODAY);
export const setBooksOverdueIndicator = genericAction(Constants.BOOKS_OVERDUE);
export const setCheckoutsToday = genericAction(Constants.CHECKOUTS_TODAY);
export const setCheckinsToday = genericAction(Constants.CHECKINS_TODAY);

export default {
    setBirthdayIndicator,
    setBooksOverdueIndicator,
    setCheckinsToday,
    setCheckoutsToday
}