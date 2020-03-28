import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootReducerModel } from 'utils/redux/rootReducer.type';

export type ThemeProps = {
  children: JSX.Element[] | JSX.Element;
  theme: 'light' | 'dark';
};

const ThemeProvider = ({ children, theme }: ThemeProps) => {
  const mode = createMuiTheme({
    palette: {
      type: theme
    }
  });

  return <MuiThemeProvider theme={mode}>{children}</MuiThemeProvider>;
};

const mapStateToProps = (currentState: RootReducerModel) => {
  return {
    theme: currentState.theme.theme
  };
};

export default connect(mapStateToProps)(ThemeProvider);
