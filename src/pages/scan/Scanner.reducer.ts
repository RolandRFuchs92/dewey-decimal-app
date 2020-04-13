import { ScannerAction, ScanReducerModel } from './Scan.type';

const initialState: ScanReducerModel = {
  open: false
};

export default function reducer(
  currentState: ScanReducerModel = initialState,
  action: ScannerAction
): ScanReducerModel {
  const { type } = action;

  switch (type) {
    case 'SCANNER_CLOSE':
      return {
        open: false
      };
    case 'SCANNER_OPEN':
      return {
        open: true
      };
    case 'SCANNER_TOGGLE':
      return {
        open: !currentState.open
      };
    default:
      return {
        ...currentState
      };
  }
}
