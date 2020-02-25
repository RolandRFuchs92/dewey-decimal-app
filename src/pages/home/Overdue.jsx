import React, { useEffect, useState } from 'react';
import { Grid, Paper, makeStyles} from '@material-ui/core';

import { getBooksOverdue } from 'pages/booksOut/booksout.repo';

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

    return <>
        {
            booksOverdue.map(({student_name, book_name, author_name, return_on}, index) => {
                return <div key={`${student_name}${book_name}${index}`}>
                    <Grid container >
                        <Grid item xs={6} className={classes.scanTileItem}>{student_name}</Grid>
                        <Grid item xs={6} className={classes.scanTileItem}>{book_name}</Grid>
                        <Grid item xs={6} className={classes.scanTileItem}>{author_name}</Grid>
                        <Grid item xs={6} className={classes.scanTileItem}>{return_on}</Grid>
                    </Grid>
                    <hr></hr>
                </div>
            })
        }
    </>
}