import {ERROR_COUNT} from './ErrorReport.constants';

export const setError = (count) => {
    const action =  {
        type: ERROR_COUNT,
        payload: count
    };
    return action;
}