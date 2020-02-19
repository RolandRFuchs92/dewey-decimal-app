import React, {useEffect} from 'react';
import Barcode from 'components/printCodes/Barcode';
import Modal from 'components/modal'

export default (props) => {
    const {modalData, columns, barcodeText} = props;

    const objectFromRowData = (rowData) => Object.fromEntries(columns.map(({name}, index) => [name,rowData[index] || '']));
    useEffect(() => {

    },[]);

    return <Modal {...props}>
        <Barcode value={barcodeText}></Barcode>
    </Modal>
}