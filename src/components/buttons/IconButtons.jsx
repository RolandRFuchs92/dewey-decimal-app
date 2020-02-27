import React from 'react';
import { Grid, Tooltip, TextField } from '@material-ui/core';


export const TooltipTextField = ({label, tooltip, value, handleChange}) => {
    return <Grid item sm={12}>
        <Tooltip title={tooltip}>
            <TextField fullWidth label={label} value={value || ''} onChange={handleChange}></TextField>
        </Tooltip>
    </Grid>
}