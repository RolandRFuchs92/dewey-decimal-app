import React from 'react';
import './App.css';
import MainLayout from './components/layout/Layout';
import {SnackbarProvider } from 'notistack';
import {ConfirmProvider} from 'material-ui-confirm';
function App() {
	return (
		<div className='App'>
			<ConfirmProvider>
				<SnackbarProvider anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}> 
					<MainLayout></MainLayout>
				</SnackbarProvider>
			</ConfirmProvider>
		</div>
	);
}

export default App;
