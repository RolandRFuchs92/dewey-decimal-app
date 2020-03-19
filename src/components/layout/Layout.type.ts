import { Dispatch } from 'redux';

export type PermanentDrawerLeftModel = {
  pageTitle: string;
  dispatch: Dispatch;
};

export type CreateListItemModel = {
  label: string;
  icon: string;
  path?: string;
  menuItems?: CreateListItemModel[];
};
