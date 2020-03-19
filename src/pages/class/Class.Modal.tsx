import React, { useState, useEffect } from 'react';
import {
  TextField,
  Modal,
  Grid,
  Fade,
  Paper,
  makeStyles,
  Typography
} from '@material-ui/core';
import FormButtons from 'components/buttons/FormButtons';

import { addOrUpdateClass } from './Class.repo';
import { useAlert } from 'utils/snackbarAlerts';
import { EventObj, JsonObj } from 'types/Generic';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 15
  },
  spacing: {}
}));

export type ClassModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  modalData: JsonObj;
  updateTable: () => void;
};

export default ({
  isOpen = false,
  handleClose,
  modalData,
  updateTable
}: ClassModalProps) => {
  const [data, setData] = useState<JsonObj>({});
  const [open, setOpen] = useState(isOpen);
  const alert = useAlert();
  const classes = useStyles();

  useEffect(() => {
    setData(modalData);
  }, [modalData]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      delete data.Edit;
      delete data.Delete;
      const action = await addOrUpdateClass(data);
      await updateTable();
      alert.success(
        `Successfully ${action === 'add' ? 'added' : 'updated'} Grade ${
          data.grade
        } - ${data.class_name}`
      );
    } catch (e) {
      alert.error(`There was an error `);
    }
  };

  const handleChange = (name: string) => ({ target: { value } }: EventObj) => {
    setData({ ...data, [name]: value });
  };

  return (
    <Modal open={open} onBackdropClick={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Grid container>
          <Paper className={classes.paper}>
            <Grid item>
              <Typography variant="h6">
                {data.class_id ? `Class (${data.class_id})` : 'Teacher'}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Class Name"
                value={data.class_name || ''}
                onChange={handleChange('class_name')}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                label="Grade"
                value={data.grade || ''}
                onChange={handleChange('grade')}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                label="Is Active"
                value={data.is_active || ''}
                onChange={handleChange('is_active')}
              ></TextField>
            </Grid>
            <Grid item>
              <FormButtons
                onReset={() => setData({})}
                onSubmit={handleSubmit}
              ></FormButtons>
            </Grid>
          </Paper>
        </Grid>
      </Fade>
    </Modal>
  );
};
