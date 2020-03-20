import { GenericActionModal } from './Home.type';

const initialState = {
  checkoutsToday: 0,
  checkinsToday: 0,
  birthdaysToday: 0,
  booksOverdue: 0
};

export default (currentState = initialState, action: GenericActionModal) => {
  const { type, payload } = action;
  switch (type) {
    case 'CHECKOUTS_TODAY':
      return {
        ...initialState,
        checkoutsToday: payload
      };
    case 'CHECKINS_TODAY':
      return {
        ...initialState,
        checkinsToday: payload
      };
    case 'BIRTHDAYS_TODAY':
      return {
        ...initialState,
        birthdaysToday: payload
      };
    case 'BOOKS_OVERDUE':
      return {
        ...initialState,
        booksOverdue: payload
      };
    default:
      return { ...currentState };
  }
};
