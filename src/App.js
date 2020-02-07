import React from 'react';
import './App.css';
import MainLayout from './components/layout/Layout';
import {SnackbarProvider } from 'notistack';
function App() {
	return (
		<div className='App'>
			<SnackbarProvider anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}> 
				<MainLayout></MainLayout>
			</SnackbarProvider>
		</div>
	);
}

export default App;
