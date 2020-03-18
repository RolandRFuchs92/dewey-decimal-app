import React, { useState, useReducer } from "react";
import "./App.css";
import { ConfirmProvider } from "material-ui-confirm";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Provider as GlobalProvider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import MainLayout from "./components/layout/Layout";
import { SnackbarProvider } from "notistack";
import initializeDb from "db/initializeDb";
import Scan from "pages/home/Scan";
import reduxReducers from "utils/redux/rootReducer";
import { ErrorIndicator } from "components/icons/Indicator";

const store = createStore(reduxReducers, applyMiddleware(ReduxThunk));

const initialState = {
  pageTitle: "Home",
  setState: () => {}
};

type ThemeProp = {
  palette: {
    type: "light" | "dark";
  };
};

function App() {
  const [showScan, setShowScan] = useState(false);
  const [theme, setTheme] = useState<ThemeProp>({
    palette: {
      type: "light"
    }
  });

  const toggleTheme = () => {
    setTheme({
      palette: {
        type: theme.palette.type === "light" ? "dark" : "light"
      }
    });
  };

  const toggleScan = () => {
    setShowScan(!showScan);
  };

  initializeDb();
  const muiTheme = createMuiTheme(theme);

  return (
    <div className="App">
      <GlobalProvider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ConfirmProvider>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
              >
                <MainLayout />
                <Scan
                  open={showScan}
                  handleClose={() => setShowScan(false)}
                  updateScans={updateScans}
                ></Scan>
                <ErrorIndicator />
              </SnackbarProvider>
            </ConfirmProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
