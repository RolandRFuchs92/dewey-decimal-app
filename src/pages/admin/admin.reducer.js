// @flow
import { ERROR_COUNT } from './errors/ErrorReport.constants';

const initialState = {
    errorCount: 0
}

declare type initialStateModel = {
    errorCount: Number
}

declare type reducerAction = {
    type: String,
    payload: Number
}

export default (currentState: initialStateModel = initialState, action: reducerAction) => {
    const {type, payload} = action;
    switch (type){ 
        case ERROR_COUNT:
            return {
                ...currentState,
                errorCount: payload
            }
        default: 
            return {...currentState};
    }
}