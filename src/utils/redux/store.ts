import reduxReducers from 'utils/redux/rootReducer';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  reduxReducers,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
