import React from 'react';
import { makeStyles, Grid, Divider } from '@material-ui/core';

import { ScansModel } from 'pages/booksOut/Booksout.type';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    padding: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    background: 'white',
    paddingBottom: 15
  },
  scanTileItem: {
    width: '50%'
  },
  odd: {
    backgroundColor: theme.palette.grey[200],
    paddingLeft: theme.spacing(),
    paddingBottom: theme.spacing(),
    transition: 'all 0.4s',
    '&:hover': {
      backgroundColor: theme.palette.grey[300]
    }
  },
  even: {
    backgroundColor: theme.palette.grey[100],
    paddingLeft: theme.spacing(),
    paddingBottom: theme.spacing(),
    '&:hover': {
      backgroundColor: theme.palette.grey[300]
    }
  },
  dataDisplay: {
    borderRadius: theme.shape.borderRadius
  }
}));

export default ({
  scans,
  isCheckin
}: {
  scans: ScansModel[];
  isCheckin: boolean;
}) => {
  const classes = useStyles();
  debugger;
  return (
    <div className={classes.dataDisplay}>
      {scans &&
        scans.map(
          (
            {
              author,
              book,
              student,
              check_out_date,
              check_in_date
            }: ScansModel,
            index
          ) => {
            const isOdd = index % 2 === 0;

            return (
              <Grid
                container
                className={`${isOdd ? classes.odd : classes.even}`}
              >
                <Grid item className={classes.scanTileItem}>
                  {book}
                </Grid>
                <Grid item className={classes.scanTileItem}>
                  {author}
                </Grid>
                <Grid item className={classes.scanTileItem}>
                  {student}
                </Grid>
                <Grid item className={classes.scanTileItem}>
                  {isCheckin ? check_in_date : check_out_date}
                </Grid>
              </Grid>
            );
          }
        )}
    </div>
  );
};
