import { GetBookCallNumberModel } from 'pages/books/Book.type';

export type ScanConstants = 'SCANNER_OPEN' | 'SCANNER_CLOSE';

export type ScannerAction = {
  type: ScanConstants;
};

export type ScanReducerModel = {
  open: boolean;
};

export type CheckoutData = {
  author_name: string;
  book_name: string;
  call_number: string;
  check_out_date: string;
  return_on: string;
  book_id: string;
};

export type GenerateCheckoutProps = {
  data: CheckoutData;
  reset: () => void;
};

export type UserSelection = {
  class: number;
  teacher: string;
  student_name: string;
  student_id: number;
};

export type ScanDataModel = {
  books_out_id: string;
  book_name: string;
  student_name: string;
  call_number: string;
  isCheckout: boolean;
  check_out_date: string;
  check_in_on: string;
  return_on: string;
  class: string;
  author_name: string;
  fine: string | 'None';
  teacher_name: string;
};

export type GenerateCheckinProps = {
  data: ScanDataModel;
  reset: () => void;
};

export type ScannerIconButtonProps = {
  handleLaptopButton: () => void;
  isScannerOpen: boolean;
};

export type ScanProps = {
  open: boolean;
};

export type ScansModel = {
  author: string;
  book: string;
  student: string;
};

export type ScansTemplateProps = {
  scans: ScansModel[];
};
