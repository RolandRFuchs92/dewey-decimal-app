import React, {useState} from 'react';
import { Badge, makeStyles } from '@material-ui/core';
import { deepPurple, lightGreen, grey} from '@material-ui/core/colors';
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
            '& .MuiBadge-root span': {
                backgroundColor: lightGreen[200],
                color: grey[700]
            }
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
        <CheckinIndicator count={count}></CheckinIndicator>
        <CheckoutIndicator count={count}></CheckoutIndicator>
        <OverdueIndicator count={count}></OverdueIndicator>
        <BirthdayIndicator count={count}></BirthdayIndicator>
    </div>
}

export const Indicator = ({count, icon, className}) => {
    return <div className={className}>
        <Badge badgeContent={count} color="secondary">
            {icon}
        </Badge>
    </div>
}

export const CheckinIndicator = ({count}) => {
    const classes = useStyles();
    return <Indicator count={count} icon={Icons.Checkin} className={classes.checkin}></Indicator>
}
export const CheckoutIndicator = ({count}) => {
    const classes = useStyles();
    return <Indicator count={count} icon={Icons.Checkout} className={classes.checkout}></Indicator>
}
export const OverdueIndicator = ({count}) => {
    const classes = useStyles();
    return <Indicator count={count} icon={Icons.Birthday} className={classes.Overdue}></Indicator>
}
export const BirthdayIndicator = ({count}) => {
    const classes = useStyles();
    return <Indicator count={count} icon={Icons.Overdue} className={classes.birthday}></Indicator>
}