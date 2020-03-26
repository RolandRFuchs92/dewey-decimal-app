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
