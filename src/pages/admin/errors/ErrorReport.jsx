import React, { useState, useEffect} from 'react';
import { makeStyles, Paper, Grid, Typography, Button } from '@material-ui/core';

import { processErrorLog } from './ErrorReport.service';

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
        }
    }
});

export default () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [errorLogResult, setErrorLogResult] = useState([]);

    useEffect(() => {
        (async () => {
            setTimeout(() => {},3000)
            setErrorLogResult(await processErrorLog());
            setIsLoading(false);
        })()
    },[]);

    return <Grid className={classes.container} container item lg={3} spacing={2}>
        <Typography variant="h5">These are application errors.</Typography>
        <div className={classes.errorContainer}>
            <ErrorList isLoading={isLoading} errors={errorLogResult[0]}></ErrorList>
        </div>
        <Button variant="contained" color="primary">Package Errors</Button>
    </Grid>
}

const ErrorList = ({errors=[], isLoading}) => {
    if(isLoading)
        return <p data-testid="errors-loading">Loading...</p> 

    const Errors = errors.map(i => <ErrorTile row={i}/>);
    return <div data-testid="errorlist">
        {Errors || <Typography variant="h5">No errors were found</Typography>}
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