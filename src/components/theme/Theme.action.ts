import { toggleThemeActionModel } from './Theme.type';

export const toggleThemeAction = (): toggleThemeActionModel => {
  return {
    type: 'TOGGLE'
  };
};
