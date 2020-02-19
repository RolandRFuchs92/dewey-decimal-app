import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import {IconButton, makeStyles, Grid } from '@material-ui/core';

import Barcode from 'components/printCodes/Barcode';
import Modal from 'components/modal'
import Icons from 'components/icons';

export default (props) => {
    const {modalData, columns, barcodeText, barcodeDescription} = props;
    const componentRef = useRef();


    return <Modal {...props}>
        <Grid container direction="column" >
            <Grid item>
                <ReactToPrint content={() => componentRef.current} trigger={() =><IconButton >{Icons.Print}</IconButton > }></ReactToPrint>
            </Grid>
            <Grid item ref={componentRef}>
                <Barcode value={barcodeText}></Barcode>
            </Grid>
        </Grid>
    </Modal>
}