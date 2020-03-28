export type themeModel = 'light' | 'dark';
export type ThemeReducerModel = {
  theme: themeModel;
};

export type ToggleConstants = 'TOGGLE';

export type toggleThemeActionModel = {
  type: ToggleConstants;
};
