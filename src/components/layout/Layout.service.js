import ERROR_COUNT from 'pages/admin/errors/ErrorReport.constants';
import { setError } from 'pages/admin/errors/ErrorReport.action';
import { errorLogErrorsCount } from 'pages/admin/errors/ErrorReport.service';

export const loadInitialAppState = async (dispatch) => {
    try {
        const errorCount = await errorLogErrorsCount();
    
        dispatch(setError(errorCount))
    } catch (error) {
        console.log(error);
    }
}
