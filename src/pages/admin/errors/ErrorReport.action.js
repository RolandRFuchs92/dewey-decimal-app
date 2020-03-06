// @flow
import {ERROR_COUNT} from './ErrorReport.constants';

export const incrementError = (payload) => {
    return {
        type: ERROR_COUNT,
        payload
    }
}