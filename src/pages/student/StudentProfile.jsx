import React, { useState, useEffect } from 'react';
import {Grid, Divider, makeStyles, Typography} from '@material-ui/core';
import {trim } from 'lodash';

import Modal from 'components/modal';
import Icons from 'components/icons';
import { getStudentProfileData } from './Student.repo';

const useStyles = makeStyles( theme => ({
    container: {
        width: 680,
        position:'relative',
        height: 345,
    },
    backgroundSetting: {
        position: 'absolute',
        height: 345,
        width:680,
        top: -15,
        left: -15,
        borderTopLeftRadius: theme.shape.borderRadius,
        background: `linear-gradient(to top, white 15px, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 85%, ${theme.palette.primary.dark})`,
    },
    studentProfile: {
        backgroundColor: theme.palette.primary.light,
        height: 375,
        width:245,
        position: 'absolute',
        right: -30,
        top: 0,
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius
    },
    studentPreImage:{
        color: 'darkgray',
        fontSize: 180
    },
    profileDataContainer: {
        height:'100%', 
        width: 680-15-215,
        backgroundColor: 'white',
        marginLeft: 15,
        padding: 15
    },
    studentHistory: {
        position:'absolute',
        left: 0,
        top: -65,
        backgroundColor: theme.palette.primary.main,
        cursor:'pointer',
        color: 'white',
        height:50,
        boxShadow: 'black 1px 3px 4px',
        width: 80,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
    }
}));

export default ({open, handleClose, studentId = 1}) => {
    const [isFront, setIsFront] = useState(true);
    const [studentData, setStudentData] = useState({});
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await getStudentProfileData(studentId);
            setStudentData(result.studentData[0]);
            setHistoryData(result.historyData);
        })();
    }, []);

    const classes = useStyles();

    return <Modal {...{open, handleClose}} >
        <div className={classes.container}>
            <div className={classes.studentHistory} onClick={() => setIsFront(!isFront)}>
                {Icons.History}
            </div>
            <Grid container className={classes.backgroundSetting}>
                <div className={classes.profileDataContainer}>
                {
                    isFront ? 
                    <StudentCard studentData={studentData}></StudentCard> :
                    <BooksHistory></BooksHistory>
                }
                </div>
                <Grid container item justify="center" alignItems="center" className={classes.studentProfile}>
                    <div className={classes.studentPreImage}>
                        {Icons.Student}
                    </div>
                </Grid>
            </Grid>
        </div>
    </Modal>
}

const BooksHistory = () => {
    return <h1>HISTORY!!!</h1>
}

const StudentCard = ({studentData ={}}) => {
    const classes = useStyles();
    const {
        first_name, 
        last_name,
        birthdate,
        mother_mobile, 
        mother_email,
        mother_name, 
        father_name, 
        father_mobile, 
        father_email,
        grade,
        class_name
        } = studentData;

    return <Grid container alignContent="space-between" style={{height: '100%'}}>
            <Grid item>
                <Typography variant="h5">{first_name} {last_name}</Typography>
                <Divider></Divider>
            </Grid>
            
            <Grid container item>
                <Grid item sm={6}>
                    <Typography variant="body1">Birthday: {birthdate}</Typography>
                </Grid>
                <Grid item sm={6}>
                    <Typography variant="body1">Grade: {grade} {class_name}</Typography>
                </Grid>
            </Grid>

            <Grid container item sm={12}>
                <Grid item sm={12}>
                    <Typography variant="h5">Mother</Typography>
                </Grid>
                <Grid item sm={6}>
                    <Typography variant="body1">{mother_name}</Typography>
                </Grid>
                <Grid item sm={6}>
                    <Typography variant="body1">{mother_mobile}</Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body1"><a href={`mailto:${{mother_email}}`}>{mother_email}</a></Typography>
                </Grid>
            </Grid>
            <Grid container item sm={12}>
                <Grid item sm={12}>
                    <Typography variant="h5">Father</Typography>
                </Grid>
                <Grid item sm={6}>
                    <Typography variant="body1">{father_name}</Typography>
                </Grid>
                <Grid item sm={6}>
                    <Typography variant="body1">{father_mobile}</Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body1"><a href={`mailto:${father_email}`}>{father_email}</a></Typography>
                </Grid>
            </Grid>

            <Grid container item sm={12}>
                <Grid item sm={12}>
                    <Typography variant="h5">Next books due</Typography>
                </Grid>
                <Grid item sm={8}>
                    <Typography variant="body1">The Magic Finger - Rahl Dahl</Typography>
                </Grid>
                <Grid item sm={4}>
                    <Typography variant="body1" align="right">Due: 12 Feb 2020</Typography>
                </Grid>
                <Grid item sm={8}>
                    <Typography variant="body1">The Twits - Rahl Dahl</Typography>
                </Grid>
                <Grid item sm={4}>
                    <Typography variant="body1" align="right">Due: 12 Feb 2020</Typography>
                </Grid>
            </Grid>
            
        </Grid>
}