// @flow
import ERROR_COUNT from 'pages/admin/errors/ErrorReport.constants';
import { setError } from 'pages/admin/errors/ErrorReport.action';
import { errorLogErrorsCount } from 'pages/admin/errors/ErrorReport.service';

import { countBooksOverdue } from 'pages/booksOut/booksout.repo';
import homeActions from 'pages/home/Home.action.js';

async function loadErrors(dispatch){
    try {
        const errorCount = await errorLogErrorsCount();
        dispatch(setError(errorCount))
    } catch (error) {
        console.log(error);
    }
}

async function genericHomeCount(setter: Function<Promise>) {
    return (dispatch) => {
        const countResult = await setter();
        dispatch(countResult);
        return Promise.resolved();
    }
}

const loadCheckoutsToday = genericHomeCount(homeActions.setCheckoutsToday);
const loadCheckinsToday = genericHomeCount(homeActions.setCheckinsToday);
const loadBirthdaysToday = genericHomeCount(homeActions.setBirthdayIndicator);
const loadBooksOverdue = genericHomeCount(homeActions.setBooksOverdueIndicator);

export async function loadInitialAppState(dispatch) {
    return await Promise.all([
        loadErrors(dispatch),
        loadCheckoutsToday(dispatch),
        loadCheckinsToday(dispatch),
        loadBirthdaysToday(dispatch),
        loadBooksOverdue(dispatch),
    ])
}

