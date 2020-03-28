import React, { useState } from 'react';
import './App.css';
import { ConfirmProvider } from 'material-ui-confirm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Provider as GlobalProvider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import MainLayout from './components/layout/Layout';
import { SnackbarProvider } from 'notistack';
import initializeDb from 'db/initializeDb';
import reduxReducers from 'utils/redux/rootReducer';
import { ErrorIndicator } from 'components/icons/Indicator';
import Scan from 'pages/scan/Scan';

const store = createStore(reduxReducers, applyMiddleware(ReduxThunk));

type ThemeProp = {
  palette: {
    type: 'light' | 'dark';
  };
};

function App() {
  initializeDb();

  return (
    <div className="App">
      <GlobalProvider store={store}>
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
      </GlobalProvider>
    </div>
  );
}

export default App;
