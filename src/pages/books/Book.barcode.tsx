import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import {
  Switch,
  FormControlLabel,
  Grid,
  Button,
  makeStyles
} from '@material-ui/core';

import Barcode from 'components/printCodes/Barcode';
import QrCode from 'components/printCodes/QrCode';
import Modal from 'components/modal';
import Icons from 'components/icons';
import { JsonObj } from 'types/Generic';

const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none'
  }
}));

export type BarcodeProps = {
  value: string;
  description: string;
  handleClose: () => void;
  open: boolean;
};

export default ({
  value,
  description: propDescription,
  handleClose,
  open
}: BarcodeProps) => {
  const [printDescription, setPrintDescription] = useState(true);
  const [showQr, setQr] = useState(true);
  const [showBarcode, setBarcode] = useState(true);
  const classes = useStyles();

  //   const handlePrint = printIndex => {
  //     setQr(printIndex === 1 || printIndex === 2);
  //     setBarcode(printIndex === 0 || printIndex === 2);
  //   };

  const comp = useRef(null);
  const description = printDescription ? propDescription : '';

  return (
    <Modal handleClose={handleClose} open={open}>
      <Grid container direction="row" justify="center">
        <Grid item container direction="column" spacing={1} sm={6}>
          <Grid item>
            <ReactToPrint
              content={() => {
                return (comp!.current as unknown) as React.ReactInstance;
              }}
              trigger={() => (
                <div>
                  <PrintButton
                    variant="contained"
                    text="Print"
                    disabled={!showQr && !showBarcode}
                  ></PrintButton>
                </div>
              )}
            ></ReactToPrint>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={showBarcode}
                  onChange={() => setBarcode(!showQr)}
                />
              }
              label="Barcode"
              labelPlacement="start"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch checked={showQr} onChange={() => setQr(!showQr)} />
              }
              label="QrCode"
              labelPlacement="start"
            />
          </Grid>
        </Grid>
        <Grid item container direction="column" spacing={1} sm={6}>
          <FormControlLabel
            control={
              <Switch
                checked={printDescription}
                onChange={() => setPrintDescription(!printDescription)}
              />
            }
            label="Hide description"
            labelPlacement="start"
          />
        </Grid>
        <Grid item ref={comp!}>
          <QrCode
            value={value}
            description={description}
            className={showQr ? '' : classes.hide}
          />
          <Barcode
            value={value}
            description={description}
            className={showBarcode ? '' : classes.hide}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

type PrintButtonProps = {
  text: string;
  variant?: 'text' | 'outlined' | 'contained';
  disabled: boolean;
};

const PrintButton = ({ text, variant, disabled }: PrintButtonProps) => {
  return (
    <Button
      variant={variant}
      color="primary"
      disabled={disabled}
      startIcon={Icons.Print}
    >
      {text}
    </Button>
  );
};
