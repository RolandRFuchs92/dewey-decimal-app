import React, {useState, useContext} from 'react';
import { Badge, makeStyles } from '@material-ui/core';
import { deepPurple, lightGreen, grey} from '@material-ui/core/colors';
import { connect } from 'react-redux';

import Icons from './index';
import reducerContext from 'utils/reducerContext';

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
        },
        applicationErrors: {
            position: 'fixed',
            bottom: 0,
            right: 0,
            background: 'rgba(255, 0, 0, 0.7)',
            padding: '5px 5px 0px 5px',
            borderRadius: '5px 5px 0px 0px',
            color:'white'
        }
    }
})

export default () => {
    const classes = useStyles();
    const [state] = useContext(reducerContext);

    return <div className={classes.indicators}>
        <CheckinIndicator count={state.checkinsTodayCount}></CheckinIndicator>
        <CheckoutIndicator count={state.checkoutsTodayCount}></CheckoutIndicator>
        <BirthdayIndicator count={state.birthdaysTodayCount}></BirthdayIndicator>
        <OverdueIndicator count={state.booksOverdueCount}></OverdueIndicator>
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
    return <Indicator count={count} icon={Icons.Overdue} className={classes.Overdue}></Indicator>
}
export const RawBirthdayIndicator = ({count}) => {
    const classes = useStyles();
    return <Indicator count={count} icon={Icons.Birthday} className={classes.birthday}></Indicator>
}

export const RawErrorIndicator = ({ count }) => {
    const classes = useStyles();
    if(!count)
        return null;
    return <span className={classes.applicationErrors}>{Icons.Warning} {count} application errors.</span>
}

const mapStateToProps = (currentState, ownProps) => {
    return {
        ...ownProps,
        count: currentState.admin.errorCount
    }
}

export const BirthdayIndicator = connect(mapStateToProps)(RawBirthdayIndicator);
export const ErrorIndicator = connect(mapStateToProps)(RawErrorIndicator);

