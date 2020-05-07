import { AdminReducerModel } from 'pages/admin/Admin.reducer';
import { GlobalReducerModel } from './globalReducer';
import { HomeReducerModel } from 'pages/home/Home.type';
import { ScanReducerModel } from 'pages/scan/Scan.type';
import { ThemeReducerModel } from 'components/theme/Theme.type';

export type RootReducerModel = {
  admin: AdminReducerModel;
  home: HomeReducerModel;
  global: GlobalReducerModel;
  scan: ScanReducerModel;
  theme: ThemeReducerModel;
};
