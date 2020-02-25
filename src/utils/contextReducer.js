import React from 'react';

const ReducerContext = React.createContext();


const reducer = (state, action) => {
    switch (action.type){
        case CHECKOUTTODAY: 
            break;
        case CHECKINTODAY:
            break;
        case BOOKSOVERDUE: 
            break
        case BIRTHDAYSTODAY: 
            break;
        default:
            return state;
    }
}

const CHECKOUTTODAY = 'CHECKOUTTODAY';
const CHECKINTODAY = 'CHECKINTODAY';
const BOOKSOVERDUE = 'BOOKSOVERDUE';
const BIRTHDAYSTODAY = 'BIRTHDAYSTODAY';

const genericAction = type = state => {
    return state => ({
        state, 
        type
    })
}

export const birthdayIndicatorAction = genericAction(BIRTHDAYSTODAY);
export const checkoutIndicatorAction = genericAction(CHECKOUTTODAY);
export const checkinIndicatorAction = genericAction(CHECKINTODAY);
export const booksOverDueAction = genericAction(BOOKSOVERDUE);

export default ReducerContext;
export const ReducerProvider = ReducerContext.Provider;
export const ReducerConsumer = ReducerContext.Consumer;


