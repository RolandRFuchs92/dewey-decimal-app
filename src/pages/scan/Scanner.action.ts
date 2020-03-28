import { ScannerAction } from './Scan.type';

export function ScannerCloseAction(): ScannerAction {
  return {
    type: 'SCANNER_CLOSE'
  };
}

export function ScannerOpenAction(): ScannerAction {
  return {
    type: 'SCANNER_OPEN'
  };
}

export function ScannerToggleAction(): ScannerAction {
  return {
    type: 'SCANNER_TOGGLE'
  };
}
