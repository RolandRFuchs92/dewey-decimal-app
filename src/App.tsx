import React, { useState } from 'react';
import './App.css';
import { ConfirmProvider } from 'material-ui-confirm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Provider as GlobalProvider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import MainLayout from 'pages/layout';
import ThemeProvider from 'components/theme';
import { SnackbarProvider } from 'notistack';
import reduxReducers from 'utils/redux/rootReducer';
import { ErrorIndicator } from 'components/icons/Indicator';
import Scan from 'pages/scan/Scan';

const store = createStore(
  reduxReducers,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

function App() {
  return (
    <div className="App">
      <GlobalProvider store={store}>
        <ThemeProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ConfirmProvider>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
              >
                <MainLayout />
                <Scan />
                <ErrorIndicator />
              </SnackbarProvider>
            </ConfirmProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
