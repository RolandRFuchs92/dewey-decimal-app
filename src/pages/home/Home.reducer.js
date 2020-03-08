// @flow

import Constants from 'pages/home/Home.constants';

const initialState = {
    checkoutsToday: 0,
    checkinsToday: 0,
    birthdaysToday: 0,
    booksOverdue: 0
}

declare type initialStateModel = {
    checkoutsToday: Number,
    checkinsToday: Number,
    birthdaysToday: Number,
    booksOverdue: Number
}

declare type reducerAction = {
    type: Constants.CHECKOUTS_TODAY | Constants.CHECKINSTODAY | Constants.BIRTHDAYS_TODAY | Constants.BOOKS_OVERDUE,
    payload: NUMBER
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