import React from 'react';
import Barcode from 'react-barcode';

import appSettings from 'appSettings';


export default ({value}) => {
    return <Barcode value={value} {...appSettings.Barcode}></Barcode>
}