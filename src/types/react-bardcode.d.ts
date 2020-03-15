declare module "react-barcode" {
  type BarcodeModel = {
    value: string;
    format: string;
    width: number;
    height: number;
  };
  function Barcode({ value, format, width, height }: BarcodeModel): JSX.Element;
  export = Barcode;
}
