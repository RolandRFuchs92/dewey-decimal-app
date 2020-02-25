import React from 'react';

const ReducerContext = React.createContext();

const CHECKOUTTODAY = 'CHECKOUTTODAY';
const CHECKINTODAY = 'CHECKINTODAY';
const BOOKSOVERDUE = 'BOOKSOVERDUE';
const BIRTHDAYSTODAY = 'BIRTHDAYSTODAY';

export const reducer = (state, action) => {
    switch (action.type){
        case CHECKOUTTODAY: 
            return {
                ...state,
                checkoutsTodayCount: action.state
            }
        case CHECKINTODAY:
            return {
                ...state,
                checkinsTodayCount: action.state
            }
        case BOOKSOVERDUE: 
            return {
                ...state,
                booksOverdueCount: action.state
            }
            break
        case BIRTHDAYSTODAY: 
            return {
                ...state,
                birthdaysTodayCount: action.state
            }
        default:
            return state;
    }
}

const genericAction = type => {
    return state => ({
        state, 
        type
    })
}

export const birthdayIndicatorAction = genericAction(BIRTHDAYSTODAY);
export const checkoutIndicatorAction = genericAction(CHECKOUTTODAY);
export const checkinIndicatorAction = genericAction(CHECKINTODAY);
export const booksOverdueAction = genericAction(BOOKSOVERDUE);

export default ReducerContext;
export const ReducerProvider = ReducerContext.Provider;
export const ReducerConsumer = ReducerContext.Consumer;
export const initialState = {
    birthdaysTodayCount: 0,
    booksOverdueCount: 0,
    checkinsTodayCount: 0,
    checkoutsTodayCount: 0
}

