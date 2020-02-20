import React, {useRef, useState} from 'react';
import ReactToPrint from 'react-to-print';
import { Switch, FormControlLabel, Grid, Button, makeStyles } from '@material-ui/core';

import Barcode from 'components/printCodes/Barcode';
import QrCode from 'components/printCodes/QrCode';
import Modal from 'components/modal'
import Icons from 'components/icons';

const useStyles = makeStyles(theme => ({
    hide: {
        display: 'none'
    }
}))

export default (props) => {
    const [printDescription, setPrintDescription] = useState(true);
    const [showQr, setQr] = useState(true);
    const [showBarcode, setBarcode] = useState(true);
    const classes = useStyles();

    const handlePrint = (printIndex) => {
        setQr(printIndex === 1 || printIndex === 2);
        setBarcode(printIndex === 0 || printIndex === 2);
    }   

    const { value, description: propDescription} = props;
    const comp = useRef();
    const description = printDescription ? propDescription : '';

    return <Modal {...props}>
        <Grid container direction="row" justify="center">
            <Grid item container direction="column" spacing={1} sm={6}>
                <Grid item onClick={() => handlePrint(0)}>
                    <ReactToPrint content={() => comp.current} trigger={() => <div><PrintButton variant="contained" text='Barcode' ></PrintButton></div> }></ReactToPrint>
                </Grid>
                <Grid item onClick={() => handlePrint(1)}>
                    <ReactToPrint content={() => comp.current} trigger={() => <div><PrintButton variant="outlined" text='Qr code' ></PrintButton></div> }></ReactToPrint>
                </Grid> 
                <Grid item onClick={() => handlePrint(2)}>
                    <ReactToPrint content={() => comp.current} trigger={() => <div><PrintButton variant="outlined" text='Qr & Barcode' ></PrintButton></div> }></ReactToPrint>
                </Grid>
            </Grid>
            <Grid item container direction="column" spacing={1} sm={6}>
                <FormControlLabel control={<Switch checked={printDescription} onChange={() => setPrintDescription(!printDescription)} value="checkedA" />}
                    label="Hide description" labelPlacement="start"
                />
            </Grid>
            <Grid item ref={comp}>
                {showQr && <QrCode {...{value, description}}></QrCode>}
                {showBarcode && <Barcode  {...{value, description}} ></Barcode>}
            </Grid>
        </Grid>
    </Modal>
}

const PrintButton = ({text, variant}) => {
    return <Button
        variant={variant}
        color="primary"
      
        startIcon={Icons.Print}
      >
        {text}
      </Button>
}