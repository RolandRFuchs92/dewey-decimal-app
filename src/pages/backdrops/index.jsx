import React, {useState, useContext} from 'react';
import {makeStyles} from '@material-ui/core';

import context from 'utils/context';
import YesNo from 'components/dialog/YesNo';

const useStyles= makeStyles(theme => ({
    parent: {
        marginTop: 200
    }
}))

export default () => {
    const {yesNo, alertSuccess, alertError } = useContext(context);
    const classes = useStyles();
    alertSuccess.isOpen = true;
    alertSuccess.title='Willy bum';
    alertSuccess.body="welcome to the willy bum";
    return <div className={classes.parent}>
        <YesNo 
            open={context.isOpen} 
            handleYes={context.handleYes} 
            handleNo={context.handleNo}
            handleClose={context.handleClose}
            text={context.text}
            title={context.title} />
    </div>
}