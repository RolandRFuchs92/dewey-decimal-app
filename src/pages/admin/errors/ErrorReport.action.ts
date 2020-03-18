import { ERROR_COUNT } from "./ErrorReport.constants";

export const setError = (count: number): { type: string; payload: number } => {
  const action = {
    type: ERROR_COUNT,
    payload: count
  };
  return action;
};
