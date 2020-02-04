import React, {useState, useEffect} from 'react';
import { TextField, Modal, Grid, Fade, Paper, makeStyles, Typography} from '@material-ui/core';
import FormButtons from 'components/buttons/FormButtons';

import {addOrUpdateClass} from './Class.repo';

const useStyles = makeStyles(theme => ({

    spacer: {
        padding: 15
    },
    center: {
        height: '100%'
    }
}));

export default ({isOpen = false, handleClose, modalData}) => {
    const [data, setData] = useState({});
    const classes = useStyles();
    useEffect(() => {
        setData(modalData);
    },[modalData])

    const handleSubmit = () => {
        addOrUpdateClass(data);
    }

    const handleChange = name => ({target: {value}}) => { setData({...data, [name]: value});}

    return <Modal open={isOpen} onClose={handleClose} closeAfterTransition >
         <Fade in={isOpen}>
                <Grid className={classes.center} item container justify="center" alignContent="center">
                    <Paper className={classes.spacer}>
                        <Grid item >
                            <Typography variant='h6'>{data.class_id ? `Class (${data.class_id})` : 'Teacher'}</Typography>
                        </Grid>
                        <Grid item>
                            <TextField label="Class Name" value={data.class_name ||''} onChange={handleChange('class_name')}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField label="Grade" value={data.grade ||''} onChange={handleChange('grade')}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField label="Is Active" value={data.is_active ||''} onChange={handleChange('is_active')}></TextField>
                        </Grid>
                        <Grid item>
                            <FormButtons onReset={() => setData({})} onSubmit={handleSubmit}></FormButtons>
                        </Grid>
                    </Paper>
             </Grid>
        </Fade>
    </Modal>
}