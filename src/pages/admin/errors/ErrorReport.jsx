import React, { useState, useEffect} from 'react';
import { makeStyles, Paper, Grid, Typography, IconButton, Button } from '@material-ui/core';


import Icons from 'components/icons';



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
    const [errors, setErrors] = useState([]);
    const [unparsed, setUnparsed] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        (async () => {
    
        })();
    }, [])

    return <Grid className={classes.container} container item lg={3} spacing={2}>
        <div>
            <Typography variant="h5">These are application errors.</Typography>
       
        </div>
        <div data-testid="errorlist" className={classes.errorContainer}>
        {
            errors && errors.map(i => (<ErrorTile row={i}></ErrorTile>))
        }
        </div>
        <Button variant="contained" color="primary">Package Errors</Button>
    </Grid>
}

const ErrorTile = ({row}) => {
    const classes = useStyles()
    if(!row)
        return null;

    return <Grid item>
        <Paper className={classes.errors}>
            <div className={classes.fullWidth}>
                <Typography variant="caption" align="left">Timestamp: {format(parse(row.timestamp, from, new Date()),to)}</Typography><br></br>
                <Typography variant="caption" align="left">Message: {row.message}</Typography><br></br>
                <pre>
                    <Typography variant="caption" align="left">stack trace: {row.stack}</Typography>
                </pre>
            </div>
        </Paper>
    </Grid>
}