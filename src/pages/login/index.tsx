import React from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  TextField,
  Box,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    container: {
      height: '100vh'
    },
    loginBox: {
      maxHeight: 300,
      maxWidth: 400,
      height: 300
    },
    avatar: {
      height: 150,
      width: 150,
      borderRadius: '100%',
      border: `5px solid ${theme.palette.secondary.main}`
    },
    heading: {
      margin: 0,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    loginButton: {
      alignSelf: 'flex-end'
    }
  };
});

export default () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.container}
    >
      <Grid item className={classes.loginBox}>
        <Paper>
          <Box p={1}>
            <Grid container spacing={1} justify="center">
              <Grid item xs={12}>
                <h1 className={classes.heading}>Welcome to Agent Rubik</h1>
              </Grid>
              <Grid item xs={12}>
                <img src="../AgentRubikImage.jpg" className={classes.avatar} />
              </Grid>
              <Grid item xs={12}>
                <TextField value="" label="Username" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField value="" label="Password" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.loginButton}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
