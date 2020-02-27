import React, { useState, useEffect} from 'react';
import { makeStyles, Paper, Grid, Typography, IconButton } from '@material-ui/core';
import { trim } from 'lodash'
import { format, parse } from 'date-fns';

import log from 'utils/logger';
import appSettings from 'appSettings';
import Icons from 'components/icons';

const fs = window.require('fs');
const path = window.require('path');
const { formatDate : {errorLog : {from, to}}} = appSettings;

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
        }
    }
});

export default () => {
    const [errors, setErrors] = useState([]);
    const [unparsed, setUnparsed] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        (async () => {
            await new Promise((res, rej) => {
                fs.readFile(`dewey.error.log`,'utf8',(err, data) =>{
                    if(err){
                        log.error(err);
                        return null;
                    }

                    try {
                        const failedToParse=[];
                        const result = data.split('\r\n').map((row, index) => {
                            try{
                                if(trim(row).length > 0)
                                    return JSON.parse(row);
                                return null
                            } catch(e) {
                                failedToParse.push({row, index, e});
                            }
                        });
                        setUnparsed(failedToParse);
                        setErrors(result);    
                    } catch (error) {
                        log.error(error);
                    }
                });
            })
        })();
    }, [])

    return <Grid className={classes.container} container item lg={3} spacing={2}>
        <div>
            <Typography variant="h5">These are application errors.</Typography>
       
        </div>
        <div className={classes.errorContainer}>
        {
            errors && errors.map(i => (<ErrorTile row={i}></ErrorTile>))
        }
        </div>
    </Grid>
}

const ErrorTile = ({row}) => {
    const classes = useStyles()
    if(!row)
        return null;

    return <Grid item>
        <Paper className={classes.errors}>
            <Typography variant="caption" align="left">Timestamp: {format(parse(row.timestamp, from, new Date()),to)}</Typography><br></br>
            <Typography variant="caption" align="left">Message: {row.message}</Typography><br></br>
            <pre>
                <Typography variant="caption" align="left">stack trace: {row.stack}</Typography>
            </pre>
        </Paper>
    </Grid>
}