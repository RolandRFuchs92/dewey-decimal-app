import React, { useState, useRef } from 'react';
import { TextField, Paper, makeStyles, InputAdornment, Typography, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { isNil } from 'lodash';

import { useAlert } from 'utils/snackbarAlerts';
import Modal from 'components/modal';
import Icons from 'components/icons';
import { getBookByCallNumber, searchForStudentsSelect } from './Home.repo';

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
    },
    title: {
      marginBottom: 15
    }
}));

export default ({open, handleClose}) => {
  const classes = useStyles();
  const input = useRef(null);
  const [ barcodeResult, setBarcodeResult] = useState({});
  const [ barcode, setBarcode] = useState('');
  const [ isCheckout, setIsCheckout] = useState(null);
  const alert = useAlert();

  const handleSubmit = async e =>{
    if(e.key !== 'Enter'){
      return;
    }
    const { target: { value } } = e; 
    setBarcode(value);
    input.current.focus();
    const data = await getBookByCallNumber(value);
    if(!data) {
      alert.error(`${value} was not found. Make sure the book is loaded`);
      return;
    }

    setIsCheckout(data.isCheckout)
    setBarcodeResult(data);
  }

    return <Modal open={open} handleClose={handleClose}>
        {
          isCheckout === null 
          && <Typography variant="h5" className={classes.title}>Scan a barcode</Typography>
        }
        <TextField tabIndex="1" ref={input} label="Barcode" autoFocus variant="outlined" onKeyDown={handleSubmit} InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.barcode} >
              {Icons.Barcode}
            </InputAdornment> 
          ),  
        }}></TextField>
      {barcodeResult.isCheckout === undefined 
        ? null
        : barcodeResult.isCheckout 
          ? <GenerateCheckout data={barcodeResult} />
          : <GenerateCheckin data={barcodeResult}></GenerateCheckin>
      }
    </Modal>
}

const GenerateCheckin = ({data}) => {
  const classes = useStyles();
  return <div className={classes.statContainer}>
    <Typography variant="h6">Checkin</Typography>
    <p>Author: <b>{data.author_name}</b></p>
    <p>Title: <b>{data.book_name}</b></p>
    <p>Call Number: <b>{data.call_number}</b></p>
    <hr></hr>
    <p>Student Name: <b>{data.student_name}</b></p>
    <p>Class: <b>{data.class}</b></p>
    <p>Teacher: <b>{data.teacher_name}</b></p>
    <hr></hr>
    <p>Check out on: <b>{data.check_out_date}</b></p>
    <p>Check in on: <b>{data.check_in_on}</b></p>
    <p>Due by:<b>{data.return_on}</b></p>
    <p>Fine due: <b>{data.fine}</b></p>
    <Button variant="contained" fullWidth>Check in</Button>
  </div>
}

const GenerateCheckout = ({data}) => {
  const [selectList, setSelectList] = useState([]);
  const [selection, setSelection] = useState({});
  const classes = useStyles();

  const handleSearch = async e => {
    const { target: {value}} = e;
    setSelectList(await searchForStudentsSelect(value));
  };
  
  const getSelection = (e,value) => {
    if(isNil(value)) return;
    setSelection({class: value.class, teacher: value.teacher});
  }

  const handleSubmit = () => {
  }

  return <div className={classes.statContainer}>
    <Typography variant="h6">Check in</Typography>
    <p>Author: <b>{data.author_name}</b></p>
    <p>Title: <b>{data.book_name}</b></p>
    <p>Call Number: <b>{data.call_number}</b></p>
    <hr></hr>
    <Autocomplete 
      label="Student" 
      options={selectList} 
      onChange={getSelection}
      getOptionLabel={option => option.text}
      ListboxProps={{onClick:getSelection}}
      noOptionsText="No students found"
      selectOnFocus={true}
      renderInput={params => (
        <TextField
          {...params}
          onChange={handleSearch} 
          label="Student"
          fullWidth
          variant="outlined"
        />)
    }></Autocomplete>
    <p>Class: <b>{selection.class}</b></p>
    <p>Teacher: <b>{selection.teacher}</b></p>
    <hr></hr>
    <p>Check out on: <b>{data.check_out_date}</b></p>
    <p>Due by:<b>{data.return_on}</b></p>
    <Button variant="contained" fullWidth onClick={handleSubmit}>Checkout</Button>
  </div> 
}

