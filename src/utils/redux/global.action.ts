import { GlobalReducerProps } from './globalReducer';

export default () => {};

export const setPageTitle = (pageTitle: string): GlobalReducerProps => {
  return {
    type: 'PAGE_TITLE',
    payload: pageTitle
  };
};
