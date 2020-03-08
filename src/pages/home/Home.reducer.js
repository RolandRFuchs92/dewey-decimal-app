// @flow

import Constants from './errors/ErrorReport.constants';

const initialState = {
    checkoutsToday: 0,
    checkinsToday: 0,
    birthdaysToday: 0,
    booksOverdue: 0
}

export default (currentState: initialStateModel = initialState, action: reducerAction) => {
    const {type, payload} = action;
    switch (type){ 
        case Constants.CHECKOUTS_TODAY:
            return {
                ...initialState,
                checkoutsToday: payload
            }
        case Constants.CHECKINS_Today:
            return {
                ...initialState,
                checkinsToday: payload
            }
        case Constants.BIRTHDAYS_TODAY:
            return {
                ...initialState,
                birthdaysToday: payload
            }
        case Constants.BOOKS_OVERDUE:
            return {
                ...initialState,
                booksOverdue: payload
            }
        default: 
            return {...currentState};
    }
}