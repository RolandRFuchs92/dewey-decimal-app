import React from 'react';

import { Modal, Grid, Paper, Fade, makeStyles } from '@material-ui/core';
import appSettings from 'appSettings.json';
import { ModalModel } from './Modal.type';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      overflow: 'scroll',
      marginTop: theme.spacing(4),
      width: `calc(100% - ${theme.spacing(1) * 2}px)`,
      height: `calc(100vh - ${theme.spacing(1) * 2}px)`
    }
  }
}));

export default ({
  handleClose,
  open = false,
  children,
  dataTestId
}: ModalModel) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onBackdropClick={handleClose}
      closeAfterTransition
      data-testid={dataTestId}
    >
      <Fade in={open} timeout={appSettings.fadeTransitionDuration}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{children}</Paper>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};
