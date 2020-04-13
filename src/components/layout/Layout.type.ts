export type PermanentDrawerLeftModel = {
  pageTitle: string;
};

export type CreateListItemModel = {
  label: string;
  icon: string;
  path?: string;
  menuItems?: CreateListItemModel[];
};
