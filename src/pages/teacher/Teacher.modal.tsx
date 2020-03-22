import React, { useEffect, useState } from 'react';
import {
  Paper,
  Modal,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FormButtons from 'components/buttons/FormButtons';

import { createOrUpdateTeacher } from './Teacher.repo';
import { useAlert } from 'utils/snackbarAlerts';
import { TeacherModel } from './Teacher.type';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 15,
    width: 300
  }
}));

export type TeacherModalProps = {
  isOpen: boolean;
  teacher: TeacherModel;
  reset: () => void;
  handleClose: () => void;
};

// ToDo: Compiler
export default ({ isOpen, teacher, reset, handleClose }: TeacherModalProps) => {
  const [newTeacher, setNewTeacher] = useState({ ...teacher });
  const [title, setTitle] = useState('Add Teacher');
  const classes = useStyles();
  const alert = useAlert();
  useEffect(() => {}, []);

  useEffect(() => {
    setNewTeacher(teacher);
    setTitle(`Teacher ${teacher.teacher_id ? `(${teacher.teacher_id})` : ''}`);
  }, [teacher]);

  const handleChange = (name: string) => ({
    target: { value }
  }: HTMLInputElement) => setNewTeacher({ ...newTeacher, [name]: value });
  const handleSubmit = async () => {
    const teacherName = `${newTeacher.first_name} ${newTeacher.last_name}`;
    let isCreate;
    try {
      isCreate = (await createOrUpdateTeacher(newTeacher)) === 'add';
      reset();
      alert.success(
        `Successfully ${
          isCreate ? 'created' : 'updated'
        } teacher ${teacherName}!`
      );
    } catch (err) {
      alert.error(
        `There was an error ${
          isCreate ? 'creating' : 'updating'
        } ${teacherName}`
      );
    }
  };

  const handleReset = () => {
    setNewTeacher({});
  };

  return (
    <Modal open={isOpen} onBackdropClick={handleClose} closeAfterTransition>
      <Grid container>
        <Paper className={classes.paper}>
          <Typography variant="h4">{title}</Typography>
          <TextField
            fullWidth
            label="First Name"
            value={newTeacher['first_name'] || ''}
            onChange={handleChange('first_name')}
          ></TextField>
          <TextField
            fullWidth
            label="Last name"
            value={newTeacher['last_name'] || ''}
            onChange={handleChange('last_name')}
          ></TextField>
          <TextField
            fullWidth
            label="Mobile"
            value={newTeacher['mobile'] || ''}
            onChange={handleChange('mobile')}
          ></TextField>
          <TextField
            fullWidth
            label="Email"
            value={newTeacher['email'] || ''}
            onChange={handleChange('email')}
          ></TextField>
          <TextField
            fullWidth
            label="Class"
            value={newTeacher['class_id'] || ''}
            onChange={handleChange('class_id')}
          ></TextField>
          <FormButtons
            onReset={handleReset}
            onSubmit={handleSubmit}
          ></FormButtons>
        </Paper>
      </Grid>
    </Modal>
  );
};
