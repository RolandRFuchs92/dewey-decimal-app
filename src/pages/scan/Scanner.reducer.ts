import { ScannerAction, ScanReducerModel } from './Scan.type';

export function reducer(
  currentState: ScanReducerModel,
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
