import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

type yesNoDialogModel = {
  open: boolean;
  handleYes: () => void;
  handleNo: () => void;
  handleClose: () => void;
  text: string;
  title: string;
  dataTestId?: string;
};

export default ({
  open = false,
  handleYes,
  handleNo,
  handleClose,
  text,
  title,
  dataTestId
}: yesNoDialogModel) => {
  return (
    <Dialog
      data-testid={dataTestId}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNo} color="primary">
          No
        </Button>
        <Button onClick={handleYes} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
