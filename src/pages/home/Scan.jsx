import React, { useState, useRef } from 'react';
import { TextField, Paper, makeStyles, InputAdornment, Typography, Button } from '@material-ui/core';

import Modal from 'components/modal';
import Icons from 'components/icons';
import { getBookByCallNumber } from './Home.repo';

const useStyles = makeStyles(theme => ({
    barcode: {
        fontSize: 35
    }
}));

export default ({open, handleClose}) => {
  const classes = useStyles();
  const input = useRef(null);
  const [ barcodeResult, setBarcodeResult] =useState({});
  const [ barcode, setBarcode] = useState('');

  const handleSubmit = async e =>{
    if(e.key !== 'Enter'){
      return;
    }
    
    const { target: { value } } = e; 
    setBarcode(value);
    input.current.focus();
    debugger;
    setBarcodeResult((await getBookByCallNumber(value))[0]);
  }

    return <Modal open={open} handleClose={handleClose}>
        <TextField tabIndex="1" ref={input} label="Barcode" autoFocus variant="outlined" onKeyDown={handleSubmit} InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.barcode} >
              {Icons.Barcode}
            </InputAdornment> 
          ),
        }}></TextField>
        <div>
            <Typography variant="h6">Check in</Typography>
            <p>Author: {barcodeResult.author_name}</p>
            <p>Title: {barcodeResult.book_name}</p>
            <p>Call Number: {barcodeResult.call_number}</p>
            <hr></hr>
            <p>Student Name: Roland Fuchs</p>
            <p>Class: 1S</p>
            <p>Teacher: Cherol Heathcoat</p>
            <p>Check out on: 1 Jan 2020</p>
            <p>Check in on: 3 Jan 2020</p>
            <p>Due by: 10 Jan 2020</p>
            <p>Fine due: R 12</p>
            <Button variant="contained">Confirm</Button>
        </div>
    </Modal>
}