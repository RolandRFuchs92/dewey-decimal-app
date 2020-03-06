// @flow
import { ERROR_COUNT } from './errors/ErrorReport.constants';

const initialState = {
    errorCount: 0
}

export default (currentState = initialState, action) => {
    const {type, payload} = action;
    switch (type){ 
        case ERROR_COUNT:
            return {
                ...currentState,
                errorCount: payload
            }
        default: 
            return {
                initialState
            };
    }
}