import React from 'react';
import QrCode from 'qrcode.react';
import { makeStyles, Typography } from '@material-ui/core';

import appSettings from 'appSettings';

const useStyles = makeStyles(theme => ({
    container: {
        position:'relative',
        display:'flex',
        justifyContent: 'center'
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
        <Typography variant="body1" align="center" className={classes.description}>{description}</Typography>
        <QrCode {...appSettings.QrCode} value={value}></QrCode>
     </div>
}