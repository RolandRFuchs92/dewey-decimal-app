import React, { useState, useRef } from 'react';
import { TextField, Paper, makeStyles, InputAdornment, Typography, Button } from '@material-ui/core';
import { differenceInBusinessDays } from 'date-fns';
import { format, parse } from 'date-fns';

import Modal from 'components/modal';
import Icons from 'components/icons';
import { getBookByCallNumber } from './Home.repo';
import appSettings from 'appSettings';

const { fines, formatDate } = appSettings;
const useStyles = makeStyles(theme => ({
    barcode: {
        fontSize: 35
    },
    statContainer: {
      '& p': {
        margin:0,
        fontSize:15
      },
      '& button': {
        marginTop: 15
      }
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
    const [data] = await getBookByCallNumber(value);
    if(data && !data.check_in_date && fines.isEnabled){
      let {check_out_date, return_on} = data;
      check_out_date = parse(data.check_out_date, formatDate.from, new Date());
      return_on = parse(data.return_on, formatDate.from, new Date());
      const diffDays = differenceInBusinessDays(check_out_date, return_on);
      debugger;
      barcodeResult.check_out_date = format(check_out_date, formatDate.to, new Date());
      barcodeResult.check_in_on = data.check_in_on && format(parse(data.check_in_on, formatDate.to, new Date()))
      data.fine = diffDays > 0 ? `R${diffDays * fines.rate}` : 'None';
    } else {
      data.fine = 'None';
    }
    setBarcodeResult(data || {});
  }

    return <Modal open={open} handleClose={handleClose}>
        <TextField tabIndex="1" ref={input} label="Barcode" autoFocus variant="outlined" onKeyDown={handleSubmit} InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.barcode} >
              {Icons.Barcode}
            </InputAdornment> 
          ),  
        }}></TextField>
        <div className={classes.statContainer}>
            <Typography variant="h6">Check in</Typography>
            <p>Author: <b>{barcodeResult.author_name}</b></p>
            <p>Title: <b>{barcodeResult.book_name}</b></p>
            <p>Call Number: <b>{barcodeResult.call_number}</b></p>
            <hr></hr>
            <p>Student Name: <b>{barcodeResult.student_name}</b></p>
            <p>Class: <b>{barcodeResult.class_name}</b></p>
            <p>Teacher: <b>{barcodeResult.teacher_name}</b></p>
            <p>Check out on: <b>{barcodeResult.check_out_date}</b></p>
            <p>Check in on: <b>{barcodeResult.check_in_on}</b></p>
            <p>Due by:<b>{barcodeResult.return_on}</b></p>
            <p>Fine due: <b>{barcodeResult.fine}</b></p>
            <Button variant="contained" fullWidth>Check in</Button>
        </div>
    </Modal>
}