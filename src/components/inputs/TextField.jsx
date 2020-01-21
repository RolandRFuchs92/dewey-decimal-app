import React from 'react';
import isNil from 'lodash';
import {TextField, Grid, MenuItem} from '@material-ui/core';

export default ({label, defaultValue, onChange}) => {
    const [val, setVal] = useState(defaultValue);

    const handleChange = ({target:{value}}) => {
        setVal(value);
        if(!isNil(onChange))
            onChange(value);
    }

    return ( <>
        <Grid item>
            <TextField onChange={handleChange} value={val} label={'Teacher'} select variant="filled">
                
            </TextField>
            <TextField onChange={handleChange} value={val} label={'Grade'} variant="filled"></TextField>
        </Grid>
    </>
    )
}