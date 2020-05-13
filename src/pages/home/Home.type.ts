import { GetStudentsWithBirthdaysModel } from 'pages/student/Student.type';
import { ScansModel } from 'pages/booksOut/Booksout.type';

export type HomeReducerModel = {
  checkoutCountForToday: number;
  checkinCountForToday: number;
  birthdaysToday: number;
  booksOverdue: number;
  checkoutsToday: ScansModel[];
  checkinsToday: ScansModel[];
};

export type HomeReducerCountOnly = Omit<
  HomeReducerModel,
  'checkinsToday' | 'checkoutsToday'
>;

export type GenericActionModal = {
  type: IndicatorActionTypes;
  payload: number;
};

export type UpdateCheckinAndCheckoutCountAction = {
  type: 'UPDATE_SCANS';
  payload: ProcessedScansModel;
};

export type FullIndicatorActionModel = {
  type: 'ALL_INDICATORS';
  payload: HomeReducerCountOnly;
};

export type IndicatorActionTypes =
  | 'BIRTHDAYS_TODAY'
  | 'BOOKS_OVERDUE'
  | 'CHECKINS_COUNT_TODAY'
  | 'CHECKOUTS_COUNT_TODAY'
  | 'ALL_INDICATORS'
  | 'UPDATE_SCANS';

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

export type BarcodeResultModel = {
  codeResult: {
    code: string;
  };
};

export type ProcessedScansModel = {
  checkoutResults: ScansModel[];
  checkoutCount: number;
  checkinResults: ScansModel[];
  checkinCount: number;
};
