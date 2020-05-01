import {
  GenericActionModal,
  FullIndicatorActionModel,
  HomeReducerModel,
  UpdateCheckinAndCheckoutCountAction,
  ProcessedScansModel
} from './Home.type';

const initialState: HomeReducerModel = {
  checkoutsToday: [],
  checkinsToday: [],
  birthdaysToday: 0,
  booksOverdue: 0,
  checkinCountForToday: 0,
  checkoutCountForToday: 0
};

export default (
  currentState = initialState,
  action:
    | GenericActionModal
    | FullIndicatorActionModel
    | UpdateCheckinAndCheckoutCountAction
) => {
  const { type, payload } = action;
  switch (type) {
    case 'CHECKOUTS_COUNT_TODAY':
      return {
        ...currentState,
        checkoutsToday: payload
      };
    case 'CHECKINS_COUNT_TODAY':
      return {
        ...currentState,
        checkinCountForToday: payload
      };
    case 'BIRTHDAYS_TODAY':
      return {
        ...currentState,
        birthdaysToday: payload
      };
    case 'BOOKS_OVERDUE':
      return {
        ...currentState,
        booksOverdue: payload
      };
    case 'UPDATE_SCANS':
      return {
        ...currentState,
        checkinCountForToday: (payload as ProcessedScansModel).checkinCount,
        checkoutCountForToday: (payload as ProcessedScansModel).checkoutCount,
        checkoutsToday: (payload as ProcessedScansModel).checkoutResults,
        checkinsToday: (payload as ProcessedScansModel).checkinResults
      };
    case 'ALL_INDICATORS':
      return {
        ...currentState,
        ...(payload as HomeReducerModel)
      };
    default:
      return { ...currentState };
  }
};
