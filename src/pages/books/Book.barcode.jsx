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
                <Grid item>
                    <ReactToPrint content={() => comp.current} trigger={() => <div><PrintButton variant="contained" text='Print' disabled={!showQr && !showBarcode}></PrintButton></div> }></ReactToPrint>
                </Grid>
                <Grid item>
                    <FormControlLabel control={<Switch checked={showBarcode} onChange={() => setBarcode(!showQr)} />}
                        label="Barcode" labelPlacement="start"
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel control={<Switch checked={showQr} onChange={() => setQr(!showQr)} />}
                            label="QrCode" labelPlacement="start"
                    />
                </Grid>

            </Grid>
            <Grid item container direction="column" spacing={1} sm={6}>
                <FormControlLabel control={<Switch checked={printDescription} onChange={() => setPrintDescription(!printDescription)} />}
                    label="Hide description" labelPlacement="start"
                />
            </Grid>
            <Grid item ref={comp}>
                 <QrCode {...{value, description}} className={showQr ? '' : classes.hide}></QrCode>
                <Barcode  {...{value, description}} className={showBarcode ? '' : classes.hide}></Barcode>
            </Grid>
        </Grid>
    </Modal>
}

const PrintButton = ({text, variant, disabled}) => {
    return <Button
        variant={variant}
        color="primary"
        disabled={disabled}
        startIcon={Icons.Print}
      >
        {text}
      </Button>
}