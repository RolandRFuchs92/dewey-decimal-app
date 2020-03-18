import { ERROR_COUNT } from "./errors/ErrorReport.constants";

type ReducerStateModel = {
  errorCount: number;
};

const initialState: ReducerStateModel = {
  errorCount: 0
};

export default (
  currentState: ReducerStateModel = initialState,
  action: { payload: ReducerStateModel; type: "ERROR_COUNT" }
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
