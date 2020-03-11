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

type textFieldModel = {
    label: string;
    defaultValue: string;
    onChange: (value: any) => void;
}

export default ({label, defaultValue, onChange}: textFieldModel) => {
    const [val, setVal] = useState(defaultValue);

    const handleChange = ({target:{value}}: {target: {value: any}}) => {
        setVal(value);
        if(!isNil(onChange))
            onChange(value);
    }

    return (<Grid item>
            <TextField fullWidth onChange={handleChange} value={val} label={label} variant="filled" />
        </Grid>
    )
}



export function Textfield({ label, defaultValue, value, onChange} : textFieldModel & { value: string}){
    const [val, setVal] = useState(defaultValue);

    useEffect(() => {
        setVal(value);
    },[value]);

    const handleChange = ({target:{value}}: {target: {value: string}}) => {
        setVal(value);
        if(!isNil(onChange))
            onChange(value);
    }

    return (<Grid item>
            <TextField fullWidth onChange={handleChange} value={val} label={label} variant="filled" />
        </Grid>
    )
}

type toolTipTextFieldModel = {
    handleChange: () => void;
    tooltip: string;
    value: string;
    rest: any[];
    label: string
};

export const TooltipTextField = ({label, tooltip, value, handleChange, ...rest}: toolTipTextFieldModel) => {
    const classes = useStyles();
    return <Grid item sm={12}>
        <Tooltip title={<span className={classes.toolTip}>{tooltip}</span>}>
            <TextField fullWidth label={label} value={value || ''} onChange={handleChange} {...rest}></TextField>
        </Tooltip>
    </Grid>
}