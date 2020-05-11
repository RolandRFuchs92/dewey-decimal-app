import React, { useEffect } from 'react';
import './App.css';
import { ConfirmProvider } from 'material-ui-confirm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Provider as GlobalProvider } from 'react-redux';

import MainLayout from 'pages/layout';
import ThemeProvider from 'components/theme';
import { SnackbarProvider } from 'notistack';
import { ErrorIndicator } from 'components/icons/Indicator';
import Scan from 'pages/scan/Scan';
import store from 'utils/redux/store';

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
