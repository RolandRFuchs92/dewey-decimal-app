import {
  GenericActionModal,
  FullIndicatorActionModel,
  HomeReducerModel,
  UpdateCheckinAndCheckoutCountAction,
  UpdateCheckinAndCheckoutCount
} from './Home.type';

const initialState = {
  checkoutsToday: 0,
  checkinsToday: 0,
  birthdaysToday: 0,
  booksOverdue: 0
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
    case 'CHECKOUTS_TODAY':
      return {
        ...currentState,
        checkoutsToday: payload
      };
    case 'CHECKINS_TODAY':
      return {
        ...currentState,
        checkinsToday: payload
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
    case 'UPDATE_CHECKIN_AND_CHECKOUT_COUNTS':
      return {
        ...currentState,
        checkoutsToday: (payload as UpdateCheckinAndCheckoutCount)
          .checkoutCount,
        checkinsToday: (payload as UpdateCheckinAndCheckoutCount).checkinCount
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
