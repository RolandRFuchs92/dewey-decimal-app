import React from 'react';
import QrCode from 'qrcode.react';
import { makeStyles, Typography } from '@material-ui/core';

import appSettings from 'appSettings';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop:15,
        marginBottom:30,
        position:'relative',
        display:'flex',
        justifyContent: 'center'
    },
    description:{
        font: '14px monospace',
        top: -15,
        zIndex:1,
        textOverflow:'ellipsis',
        width:'100%',
        position:'absolute'
    },
    value: {
        font: '14px monospace',
        bottom: -20,
        zIndex:1,
        textOverflow:'ellipsis',
        width:'100%',
        position:'absolute',
    }
}));

export default ({value, description}) => {
    const classes = useStyles();
    return <div className={classes.container}>
        <Typography variant="body1" align="center" className={classes.description}>{description}</Typography>
        <QrCode {...appSettings.QrCode} value={value}></QrCode>
        <Typography variant="body1" align="center" className={classes.value}>{value}</Typography>
     </div>
}