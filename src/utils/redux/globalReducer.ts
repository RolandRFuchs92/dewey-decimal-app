import { RootReducerModel } from './rootReducer.type';
import rootReducer from './rootReducer';

export type GlobalReducerProps = {
  type: 'PAGE_TITLE';
  payload: string;
};

export type GlobalReducerModel = {
  pageTitle: string;
};

export const initialGlobalState = {
  pageTitle: 'No Page Title'
};

export default (
  currentState: GlobalReducerModel = initialGlobalState,
  { type, payload }: GlobalReducerProps
) => {
  switch (type) {
    case 'PAGE_TITLE':
      return {
        pageTitle: payload
      };
    default: {
      return {
        pageTitle: 'No Page Title'
      };
    }
  }
};
