import { ReducerStateModel } from 'pages/admin/admin.reducer';
import { GlobalReducerModel } from './globalReducer';
import { HomeReducerModel } from 'pages/home/Home.type';

export type RootReducerModel = {
  admin: ReducerStateModel;
  home: HomeReducerModel;
  global: GlobalReducerModel;
};
