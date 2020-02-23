import React, { useEffect, useState } from 'react';

import { Grid, Paper, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        height: 500
    }
}))

export default () => {
    const classes = useStyles();
    const [booksOverdue, setBooksOverdue] = useState([]);

    useEffect(() => {
        (async () => {
            setBooksOverdue(await getBooksOverdue());
        })();
    },[]);

    return <div className={classes.container}>
        <Paper> 
            Books overdue
        </Paper>
    </div>
}