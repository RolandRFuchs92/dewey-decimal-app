// @flow

import {ERROR_COUNT} from './ErrorReport.constants';

export const setError = (count: Number) => {
    const action =  {
        type: ERROR_COUNT,
        payload: count
    };
    return action;
}