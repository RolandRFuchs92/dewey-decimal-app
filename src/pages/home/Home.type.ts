import { JsonObj } from 'types/Generic';

export type GenericActionModal = {
  type: IndicatorActionTypes;
  payload: number;
};

export type IndicatorActionTypes =
  | 'BIRTHDAYS_TODAY'
  | 'BOOKS_OVERDUE'
  | 'CHECKINS_TODAY'
  | 'CHECKOUTS_TODAY';

export type CalculateCheckoutModel = {
  isCheckout: boolean;
  return_on: string;
  check_out_date: string;
  fine: string | 'None';
  fetchStudents: () => Promise<
    {
      value: string;
      text: string;
    }[]
  >;
};

export type CalculateCheckinModel = {
  isCheckout: boolean;
  check_out_date: string;
  check_in_on: string;
  return_on: string;
  fine: string | 'None';
};

export type ScansTemplateProps = {
  scans: ScansModel[];
};

export type ScansModel = {
  author: string;
  book: string;
  student: string;
};

export type HomePageTileProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
  indicator: JSX.Element;
};

export type HomeProps = {
  toggleScan: () => Promise<void>;
  checkins: ScansModel[];
  checkouts: ScansModel[];
};

export type BirthdaysType = {
  teacher: string;
  student: JsonObj[];
};

export type ScanProps = {
  open: boolean;
  handleClose: () => void;
  updateScans: () => void;
};

export type BarcodeResultModel = {
  codeResult: {
    code: string;
  };
};
