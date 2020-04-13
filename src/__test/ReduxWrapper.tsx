import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from 'utils/redux/rootReducer';

const store = createStore(rootReducers);

export default ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <Provider store={store}>{children}</Provider>;
};
