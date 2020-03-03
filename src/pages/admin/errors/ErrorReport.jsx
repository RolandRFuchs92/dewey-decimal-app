import React, { useState, useEffect} from 'react';
import { makeStyles, Paper, Grid, Typography, Button } from '@material-ui/core';
import { processErrorLog } from './ErrorReport.service';
import { useDialog } from 'utils/dialog';
import { packageErrors } from '../../../electron/applicationErrors/applicationErrors';

const useStyles = makeStyles(theme => {
    return {
        container: {
            margin:15,
        },
        errorContainer: {
            overflowX: "scroll",
            overflowY: 'scroll',
            height: 600
        },
        errors: {
            textAlign: 'left',
            padding: 15,
            margin: 15
        },
        fullWidth: {
            width:'100%'
        },
        packageButton: {
            marginTop:15
        },
        title: {
            width: '100%',
            alignSelf: "flex-start"
        }
    }
});

export default () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [errorLogResult, setErrorLogResult] = useState([]);
    const dialog = useDialog();

    useEffect(() => {
        (async () => {
            const result = await processErrorLog();
            setErrorLogResult(result);
            setIsLoading(false);
        })()
    },[]);

    const handlePackageErrors = () => {
        window.ipcRenderer.send('selectPackagePath');
    }

    window.ipcRenderer.on('selectedPackagePath', function (event, result) {
        debugger;
    })

    return <Grid className={classes.container} container justify="flex-end" item lg={3} spacing={2}>
        <Typography align="left" variant="h5" className={classes.title}>These are application errors.</Typography>
        <div className={classes.errorContainer}>
            <ErrorList isLoading={isLoading} errors={errorLogResult} />
        </div>
        <Button variant="contained" color="primary" className={classes.packageButton} onClick={handlePackageErrors}>Package Errors</Button>
    </Grid>
}

const ErrorList = ({errors=[], isLoading}) => {
    if(isLoading)
        return <p data-testid="errors-loading">Loading...</p> 

    const Errors = errors.map((row, index) => <ErrorTile key={index} row={row}/>);
    return <div data-testid="errorlist">
        {Errors.length ? Errors : <Typography data-testid="no-errors" variant="h5">No errors were found</Typography>}
    </div>
}


const ErrorTile = ({row}) => {
    const classes = useStyles()
    if(!row)
        return null;

    return <Grid item>
        <Paper className={classes.errors}>
            <div className={classes.fullWidth}>
                <Typography variant="caption" align="left">Timestamp: {row.timestamp}</Typography><br></br>
                <Typography variant="caption" align="left">Message: {row.message}</Typography><br></br>
                <pre>
                    <Typography variant="caption" align="left">stack trace: {row.stack}</Typography>
                </pre>
            </div>
        </Paper>
    </Grid>
}