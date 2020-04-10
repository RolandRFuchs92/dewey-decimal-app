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
    padding: 15
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
        <Grid container>
          <Paper className={classes.paper}>{children}</Paper>
        </Grid>
      </Fade>
    </Modal>
  );
};
