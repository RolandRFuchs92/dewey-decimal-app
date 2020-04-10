import React, { useState, useEffect, ChangeEvent } from 'react';
import isNil from 'lodash';
import { TextField, Grid, Tooltip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    toolTip: {
      fontSize: 14
    }
  };
});

type textFieldModel = {
  label: string;
  defaultValue: string;
  onChange: (value: any) => void;
  dataTestId?: string;
};

export default ({
  label,
  defaultValue,
  onChange,
  dataTestId
}: textFieldModel) => {
  const [val, setVal] = useState(defaultValue);

  const handleChange = ({ target: { value } }: { target: { value: any } }) => {
    setVal(value);
    // if (!isNil(onChange)) {
    onChange(value);
    // }
  };

  return (
    <Grid item data-testid={dataTestId}>
      <TextField
        fullWidth
        onChange={handleChange}
        value={val}
        defaultValue={defaultValue}
        label={label}
        variant="filled"
      />
    </Grid>
  );
};

export type TextfieldProps = {
  label: string;
  value: string;
  defaultValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
};

export function Textfield({
  label,
  value,
  defaultValue,
  onChange,
  dataTestId
}: TextfieldProps) {
  const [val, setVal] = useState(defaultValue);

  useEffect(() => {
    setVal(value || defaultValue);
  }, [value]);

  const handleChange = ({
    target: { value }
  }: {
    target: { value: string };
  }) => {
    setVal(value);
    if (!isNil(onChange)) onChange(value);
  };

  return (
    <Grid item data-testid={dataTestId}>
      <TextField
        fullWidth
        onChange={handleChange}
        value={val}
        label={label}
        variant="filled"
      />
    </Grid>
  );
}

type toolTipTextFieldModel = {
  handleChange: (evt: { target: { value: string } }) => void;
  tooltip: string;
  value: string;
  label: string;
  rest?: any[];
  dataTestId?: string;
};

export const TooltipTextField = ({
  label,
  tooltip,
  value,
  handleChange,
  dataTestId
}: toolTipTextFieldModel) => {
  const classes = useStyles();
  return (
    <Grid item sm={12} data-testid={dataTestId}>
      <Tooltip title={<span className={classes.toolTip}>{tooltip}</span>}>
        <TextField
          fullWidth
          label={label}
          value={value || ''}
          onChange={handleChange}
        ></TextField>
      </Tooltip>
    </Grid>
  );
};
