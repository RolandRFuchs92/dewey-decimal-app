import React from 'react';
import './App.css';
import MainLayout from './components/layout/Layout';
import {SnackbarProvider } from 'notistack';
import {ConfirmProvider} from 'material-ui-confirm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import initializeDb from 'db/initializeDb';
import { Provider } from 'utils/context';

const initialState = {
	pageTitle: 'Home',
	setState: () => {}
}

function App() {
	const [state, setState] = React.useState(initialState);
	state.setState = state => setState({...state});
	initializeDb();
	return (
		<div className='App'>
			<Provider value={state}>
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
			</Provider>
		</div>
	);
}

export default App;
