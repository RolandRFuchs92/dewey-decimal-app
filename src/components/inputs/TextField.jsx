import React, {useState, useEffect} from 'react';
import isNil from 'lodash';
import {TextField, Grid, Tooltip, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        toolTip: {
            fontSize:14
        }
    }
});

export default ({label, defaultValue, onChange}) => {
    const [val, setVal] = useState(defaultValue);

    const handleChange = ({target:{value}}) => {
        setVal(value);
        if(!isNil(onChange))
            onChange(value);
    }

    return (<Grid item>
            <TextField fullWidth onChange={handleChange} value={val} label={label} variant="filled" />
        </Grid>
    )
}

export function Textfield({label, defaultValue, value, onChange}){
    const [val, setVal] = useState(defaultValue);

    useEffect(() => {
        setVal(value);
    },[value]);

    const handleChange = ({target:{value}}) => {
        setVal(value);
        if(!isNil(onChange))
            onChange(value);
    }

    return (<Grid item>
            <TextField fullWidth onChange={handleChange} value={val} label={label} variant="filled" />
        </Grid>
    )
}

export const TooltipTextField = ({label, tooltip, value, handleChange}) => {
    const classes = useStyles();
    return <Grid item sm={12}>
        <Tooltip title={<span className={classes.toolTip}>{tooltip}</span>}>
            <TextField fullWidth label={label} value={value || ''} onChange={handleChange}></TextField>
        </Tooltip>
    </Grid>
}