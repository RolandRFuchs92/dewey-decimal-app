import React from 'react';
import Barcode from 'react-barcode';
import { Typography, makeStyles } from '@material-ui/core';
import appSettings from 'appSettings';

const useStyles = makeStyles(theme => ({
    container: {
        position:'relative'
    },
    description:{
        font: '14px monospace',
        top: -18,
        textOverflow:'ellipsis',
        width:'100%',
        position:'absolute'
    }
}));

export default ({value, description}) => {
    const classes = useStyles();
    return <div className={classes.container}>    
            <Typography variant="body1" align="center" className={classes.description}>Hello world</Typography>
            <Barcode value={value} {...appSettings.Barcode} ></Barcode>
        </div>
}