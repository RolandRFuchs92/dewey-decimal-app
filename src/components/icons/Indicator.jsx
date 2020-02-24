import React, {useState} from 'react';
import { Badge, makeStyles } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Icons from './index';

const useStyles = makeStyles(theme => {
    return {
        indicators: {
            display: 'flex',
            position: 'absolute',
            justifyContent: 'space-between',
            width: '100%',
            alignItems:'baseline',
            padding: 15,
            height: 64,
            fontSize: 23,
          
        },
        checkin: {
            color: theme.palette.primary.light            
        },
        checkout: {
            color: theme.palette.info.light
        },
        birthday: {
            color: deepPurple[300]
        },
        Overdue: {
            color: theme.palette.warning.light,
            '& span' :{
                marginBottom: 4
            },
            fontSize: 23,
            paddingBottom: 2
        }
    }
})

export default () => {
    const classes = useStyles();
    const [count, setCount] = useState(8);

    return <div className={classes.indicators}>
        <Indicator count={count} icon={Icons.Checkin} className={classes.checkin}></Indicator>
        <Indicator count={count} icon={Icons.Checkout} className={classes.checkout}></Indicator>
        <Indicator count={count} icon={Icons.Overdue} className={classes.Overdue}> </Indicator>
        <Indicator count={count} icon={Icons.Birthday} className={classes.birthday}></Indicator>
    </div>
}

export const Indicator = ({count, icon, className}) => {
    return <div className={className}>
        <Badge badgeContent={count} color="secondary">
            {icon}
        </Badge>
    </div>
}