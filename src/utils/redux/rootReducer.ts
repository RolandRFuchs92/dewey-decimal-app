import { combineReducers } from 'redux';

import admin from 'pages/admin/admin.reducer';
import home from 'pages/home/Home.reducer';
import global from 'utils/redux/globalReducer';

export default combineReducers({
  admin,
  home,
  global
});
