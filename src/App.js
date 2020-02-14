import React from 'react';
import './App.css';
import MainLayout from './components/layout/Layout';
import {SnackbarProvider } from 'notistack';
import {ConfirmProvider} from 'material-ui-confirm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import initializeDb from 'db/initializeDb';

const { ipcRenderer, remote } = window.require( "electron" );
ipcRenderer.send( "setMyGlobalVariable", "Hi There!" );

function App() {
	initializeDb();
	return (
		<div className='App'>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<ConfirmProvider>
					<SnackbarProvider anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}> 
						<MainLayout></MainLayout>
					</SnackbarProvider>
				</ConfirmProvider>
			</MuiPickersUtilsProvider>
		</div>
	);
}

export default App;
