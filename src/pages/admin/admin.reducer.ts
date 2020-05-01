import { ERROR_COUNT } from './errors/ErrorReport.constants';

export type AdminReducerModel = {
  errorCount: number;
};

const initialState: AdminReducerModel = {
  errorCount: 0
};

export default (
  currentState: AdminReducerModel = initialState,
  action: { payload: AdminReducerModel; type: 'ERROR_COUNT' }
) => {
  const { type, payload } = action;
  switch (type) {
    case ERROR_COUNT:
      return {
        ...currentState,
        errorCount: payload
      };
    default:
      return { ...currentState };
  }
};
