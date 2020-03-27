import { GetStudentsWithBirthdaysModel } from 'pages/student/Student.type';

export type GenericActionModal = {
  type: IndicatorActionTypes;
  payload: number;
};

export type HomeReducerModel = {
  checkoutsToday: number;
  checkinsToday: number;
  birthdaysToday: number;
  booksOverdue: number;
};

export type FullIndicatorActionModel = {
  type: 'ALL_INDICATORS';
  payload: HomeReducerModel;
};

export type IndicatorActionTypes =
  | 'BIRTHDAYS_TODAY'
  | 'BOOKS_OVERDUE'
  | 'CHECKINS_TODAY'
  | 'CHECKOUTS_TODAY'
  | 'ALL_INDICATORS';

export type CalculateCheckoutModel = {
  isCheckout: boolean;
  return_on: string;
  check_out_date: string;
  fine: string | 'None';
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
  checkins: ScansModel[];
  checkouts: ScansModel[];
};

export type BirthdaysType = {
  teacher: string;
  student: GetStudentsWithBirthdaysModel[];
};

export type ScanProps = {
  open: boolean;
  handleClose: () => void;
};

export type BarcodeResultModel = {
  codeResult: {
    code: string;
  };
};
