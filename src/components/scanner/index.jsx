import React, { useEffect} from 'react';
import Quagga from 'quagga';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        viewport : {
            '& div.viewport canvas': {
                display: 'none'
            },
            '& div.viewport video' : {
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
    }
})

export default ({onDetected = r => alert(r.codeResult.code), open }) => {
    const classes = useStyles();

    useEffect(()=>{
        if(open) {
            Quagga.init({
                inputStream: {
                    type : "LiveStream",
                    constraints: {
                        width: 640,
                        height: 480,
                        facing: "environment" // or user
                    }
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: 2,
                readers: [{
                    format: "code_128_reader",
            
                }],
                locate: true,
        
            }, function(err) {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            });
            Quagga.onDetected(onDetected);
        
            return () => Quagga.offDetected(onDetected);
        }
    },[open]);

    if(!open)
        return null;

    return (
      <Grid item md={6} className={classes.videoContainer}>
        <div className={classes.viewport}>
            <Typography variant="h5">Display barcode to easily checkin/out</Typography>
            <div id="interactive" className="viewport"></div>
        </div>
      </Grid>
    ); 
}