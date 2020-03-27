import { ReducerStateModel } from 'pages/admin/admin.reducer';
import { HomeReducerModel } from 'pages/home/Home.reducer';
import { GlobalReducerModel } from './globalReducer';

export type RootReducerModel = {
  admin: ReducerStateModel;
  home: HomeReducerModel;
  global: GlobalReducerModel;
};
