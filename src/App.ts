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
import { Provider } from "utils/context";
import {
  reducer,
  initialState as reducerInitialState
} from "utils/reducerContext";
import Scan from "pages/home/Scan";
import reduxReducers from "utils/redux/rootReducer";
import { ErrorIndicator } from "components/icons/Indicator";

const store = createStore(reduxReducers, applyMiddleware(ReduxThunk));

const initialState = {
  pageTitle: "Home",
  setState: () => {}
};

function App() {
  const [state, setState] = useState(initialState);
  const [updateScans, setUpdateScans] = useState({ update: () => {} });
  const [reducerState, dispatch] = useReducer(reducer, reducerInitialState);
  const [showScan, setShowScan] = useState(false);
  const [theme, setTheme] = useState({
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

  state.setState = state => setState({ ...state });
  initializeDb();
  const muiTheme = createMuiTheme(theme);

  return (
    <div className="App">
      <GlobalProvider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <ReducerProvider value={[reducerState, dispatch]}>
            <Provider
              value={{ state, toggleTheme, toggleScan, setUpdateScans }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ConfirmProvider>
                  <SnackbarProvider
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                    }}
                  >
                    <MainLayout></MainLayout>
                    <Scan
                      open={showScan}
                      handleClose={() => setShowScan(false)}
                      updateScans={updateScans}
                    ></Scan>
                    <ErrorIndicator />
                  </SnackbarProvider>
                </ConfirmProvider>
              </MuiPickersUtilsProvider>
            </Provider>
          </ReducerProvider>
        </MuiThemeProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
