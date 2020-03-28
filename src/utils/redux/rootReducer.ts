import { combineReducers } from 'redux';

import admin from 'pages/admin/admin.reducer';
import home from 'pages/home/Home.reducer';
import global from 'utils/redux/globalReducer';
import scan from 'pages/scan/Scanner.reducer';

export default combineReducers({
  admin,
  home,
  global,
  scan
});
