import { combineReducers } from "redux";

import admin from "pages/admin/admin.reducer";
import home from "pages/home/Home.reducer";

export default combineReducers({
  admin,
  home
});
