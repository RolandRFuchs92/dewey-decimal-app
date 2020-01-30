import React, {useState, useEffect} from 'react';
import isNil from 'lodash';
import {TextField, Grid, MenuItem} from '@material-ui/core';

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