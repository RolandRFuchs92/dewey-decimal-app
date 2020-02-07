import React, {useEffect } from 'react';

import {Snackbar } from '@material-ui/core';
import {MuiAlert} from '@material-ui/lab';

export default ({ open, onClose, ...props}) => {
    useEffect(()=>{},[open])
    return <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <MuiAlert elevation={6} variant="filled" {...props} >Successfully saved a new teacher</MuiAlert>
  </Snackbar>;
  }
