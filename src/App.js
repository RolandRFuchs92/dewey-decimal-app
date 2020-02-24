import React from 'react';
import './App.css';
import {ConfirmProvider} from 'material-ui-confirm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import MainLayout from './components/layout/Layout';
import {SnackbarProvider } from 'notistack';
import initializeDb from 'db/initializeDb';
import { Provider } from 'utils/context';
import Scan from 'pages/home/Scan';

const initialState = {
	pageTitle: 'Home',
	setState: () => {}
}

function App() {
	const [state, setState] = React.useState(initialState);
	const [showScan, setShowScan] = React.useState({
		updateScans: false,
		open: false
	});
	const [theme, setTheme] = React.useState({
		palette: {
			type: 'light'
		}
	});

	const toggleTheme = () => {
		setTheme({
			palette: {
				type: theme.palette.type === 'light'
					? 'dark'
					: 'light'
			}
		});
	}

	const toggleScan = (updateScans = false) => {
		setShowScan({
			showScan: !showScan,
			updateScans: updateScans
		});
	}

	state.setState = state => setState({...state});
	initializeDb();
	const muiTheme = createMuiTheme(theme);

	return (
		<div className='App'>
			<MuiThemeProvider theme={muiTheme}>
				<Provider value={{state, toggleTheme, toggleScan}}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<ConfirmProvider>
							<SnackbarProvider anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}> 
								<MainLayout></MainLayout>
            					<Scan open={showScan.open} handleClose={() => setShowScan(false)} updateScans={showScan.updateScans}></Scan>
							</SnackbarProvider>
						</ConfirmProvider>
					</MuiPickersUtilsProvider>
				</Provider>
			</MuiThemeProvider>
		</div>
	);
}

export default App;
