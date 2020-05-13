import { combineReducers } from 'redux';

import admin from 'pages/admin/Admin.reducer';
import home from 'pages/home/Home.reducer';
import global from 'utils/redux/globalReducer';
import scan from 'pages/scan/Scanner.reducer';
import theme from 'components/theme/Theme.reducer';

export default combineReducers({
  admin,
  home,
  global,
  scan,
  theme
});
