import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import {IconButton, makeStyles, Grid } from '@material-ui/core';

import Barcode from 'components/printCodes/Barcode';
import QrCode from 'components/printCodes/QrCode';
import Modal from 'components/modal'
import Icons from 'components/icons';

export default (props) => {
    const {modalData, columns, value, description} = props;
    const componentRef = useRef();


    return <Modal {...props}>
        <Grid container direction="column" >
            <Grid item>
                <ReactToPrint content={() => componentRef.current} trigger={() =><IconButton >{Icons.Print}</IconButton > }></ReactToPrint>
            </Grid>
            <Grid item ref={componentRef}>
                <QrCode {...{value, description}}></QrCode>
                <Barcode {...{value, description}}></Barcode>
            </Grid>
        </Grid>
    </Modal>
}