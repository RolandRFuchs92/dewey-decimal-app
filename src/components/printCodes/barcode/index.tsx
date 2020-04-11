import React from 'react';
import Barcode from 'react-barcode';
import { Typography, makeStyles } from '@material-ui/core';
import appSettings from 'appSettings.json';

import { BarcodeModel } from 'components/printCodes/PrintCodes.type';

const useStyles = makeStyles(theme => ({
  container: {
    margin: 20,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  description: {
    font: '14px monospace',
    top: -10,
    zIndex: 1,
    textOverflow: 'ellipsis',
    width: '100%',
    position: 'absolute'
  }
}));

export default ({ value, description, className }: BarcodeModel) => {
  const classes = useStyles();
  return (
    <div className={`${classes.container} ${className}`}>
      <Typography
        variant="body1"
        align="center"
        className={classes.description}
      >
        {description}
      </Typography>
      <Barcode
        value={value}
        format={appSettings.barcode.format}
        height={appSettings.barcode.height}
        width={appSettings.barcode.width}
      />
    </div>
  );
};
