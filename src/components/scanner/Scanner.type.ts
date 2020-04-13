export type ScannerModel = {
  onDetected: (r: { codeResult: { code: string } }) => void;
  open: boolean;
};
