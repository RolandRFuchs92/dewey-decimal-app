import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100%",
    padding: 15,
    display: "flex",
    flexDirection: "column"
  },
  title: {
    background: "white",
    paddingBottom: 15
  },
  scanTileItem: {
    width: "50%"
  }
}));

export default ({ scans }) => {
  const classes = useStyles();

  return (
    <>
      {scans &&
        scans.map(({ author, book, student }) => {
          return (
            <>
              <Grid container>
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
                  ###TODO: TIME###
                </Grid>
              </Grid>
              <hr></hr>
            </>
          );
        })}
    </>
  );
};
