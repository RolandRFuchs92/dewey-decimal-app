import { ThemeReducerModel, toggleThemeActionModel } from './Theme.type';

const initialState: ThemeReducerModel = {
  theme: 'light'
};

export default (
  currentState = initialState,
  action: toggleThemeActionModel
) => {
  const { type } = action;

  switch (type) {
    case 'TOGGLE':
      return {
        theme: currentState.theme === 'light' ? 'dark' : 'light'
      };
    default:
      return currentState;
  }
};
