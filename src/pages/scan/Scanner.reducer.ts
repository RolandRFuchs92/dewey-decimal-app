import { ScannerAction } from './Scan.type';

export function reducer(currentState: any, action: ScannerAction) {
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
    default:
      return {
        ...currentState
      };
  }
}
