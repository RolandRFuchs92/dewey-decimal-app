import React, { useState, useEffect } from 'react';
import {makeStyles, Typography, Paper} from '@material-ui/core';

import Icons from 'components/icons';
import { getBirthdays } from './Home.repo';

const useStyles = makeStyles(theme => ({
    container: {
        minWidth: 300,
        padding: 15,
        height: '100%'
    }
}));

export default () => {
    const [state, setState] = useState([]);
    const classes = useStyles();
    
    useEffect(() => {
        (async () => {
            setState(await getBirthdays());
        })();
    },[])


    return <Paper className={classes.container}>
        <Typography variant="h6">{Icons.Birthday} Birthdays Today {Icons.Birthday}</Typography>
        {state.map(({first_name, last_name, grade, class_name, teacher}, index) => {
            return <div key={`${last_name}${class_name}${index}`}>
                {first_name} {last_name} - {grade} {class_name} {teacher}
            </div>
        })}
    </Paper>
}