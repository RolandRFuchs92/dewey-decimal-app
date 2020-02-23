import React, { useState, useEffect } from 'react';
import {makeStyles, Typography, Paper} from '@material-ui/core';
import { chain } from 'lodash';

import Icons from 'components/icons';
import { getBirthdays } from './Home.repo';

const useStyles = makeStyles(theme => {
    return {
        container: {
            padding: 15,
            height: '100%',
            overflow: 'overlay'
        },
        heading: {
            position: 'sticky',
            top: 0,
            backgroundColor: 'white'
        },
        birthday: {
            padding: 10
        },
        teachers: {
            marginBottom: 5,
            paddingLeft: 5,
            '& p': {
                marginLeft: 5
            }
        }
    }
});

export default () => {
    const [state, setState] = useState([]);
    const classes = useStyles();
    
    useEffect(() => {
        (async () => {
            const birthdays = chain(await getBirthdays())
            .groupBy("teacher")
            .map((value, key) => ({
                teacher:key, student: value
            })).value();

            setState(birthdays);
        })();
    },[])


    return <Paper className={classes.container}>
        {
            state.map(({teacher, student}, index) => {
                const { grade, class_name} = student[0];
                return <Paper key={`${teacher}${index}`} className={classes.teachers}>
                    <Typography variant="h6" align="left">{teacher} - {grade}{class_name}</Typography>
                    {
                        student.map(({first_name, last_name}, index) => {
                            return <Typography variant="body2" align="left" key={`${index}${first_name}${last_name}`}>{first_name} {last_name}</Typography>
                        })
                    }
                </Paper>
            })
        }
    </Paper>
}