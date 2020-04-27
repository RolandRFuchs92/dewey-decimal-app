import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import { makeStyles, Grid, Typography } from '@material-ui/core';

import { ScannerModel } from './Scanner.type';

const useStyles = makeStyles(theme => {
  return {
    viewport: {
      '& div.viewport canvas': {
        display: 'none'
      },
      '& div.viewport video': {
        width: '100%'
      },
      '& .drawingBuffer': {
        position: 'absolute',
        top: 0,
        left: 0
      }
    },
    videoContainer: {
      padding: 10
    }
  };
});

export default ({
  onDetected = (r: { codeResult: { code: string } }) =>
    alert(r.codeResult.code),
  open
}: ScannerModel) => {
  const classes = useStyles();
  const [isScannerError, setIsScannerError] = useState<string>('');

  useEffect(() => {
    if (open) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            constraints: {
              width: 640,
              height: 480,
              facing: 'environment' // or user
            }
          },
          locator: {
            patchSize: 'medium',
            halfSample: true
          },
          numOfWorkers: 2,
          readers: [
            {
              format: 'code_128_reader'
            }
          ],
          locate: true
        },
        function(err: Error) {
          if (err) {
            return setIsScannerError(JSON.stringify(err));
          }
          Quagga.start();
        }
      );
      Quagga.onDetected(onDetected);

      return () => Quagga.offDetected(onDetected);
    }
    return () => {};
  }, [onDetected, open]);

  if (!open) return null;

  return (
    <Grid item md={6} className={classes.videoContainer}>
      <div className={classes.viewport}>
        <Typography variant="h5">
          Display barcode to easily checkin/out
        </Typography>
        {isScannerError}
        {/* {isScannerError && (
          <Typography variant="h5">
            There was a problem opening the webcam.
          </Typography>
        )} */}
        <div id="interactive" className="viewport" />
      </div>
    </Grid>
  );
};
