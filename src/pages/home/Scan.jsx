import React, { useState, useRef } from "react";
import {
  TextField,
  makeStyles,
  InputAdornment,
  Typography,
  Button,
  IconButton,
  Grid
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { isNil } from "lodash";

import { checkout, checkin } from "pages/booksOut/booksout.repo";
import { useAlert } from "utils/snackbarAlerts";
import Modal from "components/modal";
import Icons from "components/icons";
import { getBookByCallNumber, searchForStudentsSelect } from "./Home.repo";
import Scanner from "components/scanner";

const useStyles = makeStyles(theme => ({
  barcode: {
    fontSize: 35
  },
  statContainer: {
    "& p": {
      margin: 0,
      fontSize: 15
    },
    "& button": {
      marginTop: 15
    }
  },
  title: {
    marginBottom: 15
  },
  phone: {
    marginLeft: 15,
    "&.active": {
      color: theme.palette.error.light
    }
  },
  laptopCamera: {
    marginLeft: 15,
    "&.active": {
      color: theme.palette.error.light
    }
  }
}));

export default ({ open, handleClose, updateScans }) => {
  const classes = useStyles();
  const input = useRef(null);
  const [isScannerOpen, setIsScannerOpen] = useState(true);

  const [barcodeResult, setBarcodeResult] = useState({});
  const [barcode, setBarcode] = useState("");

  const alert = useAlert();

  const _handleClose = () => {
    setBarcode("");
    handleClose();
    setBarcodeResult({});
  };

  const handleSubmit = async e => {
    if (e.key !== "Enter") return;

    const {
      target: { value }
    } = e;
    input.current.focus();
    setBarcode(value);
    handleCheckinout(value);
  };

  const reset = () => {
    updateScans.update();
    setBarcode("");
    setBarcodeResult({});
  };

  const handleDetectedCode = ({ codeResult: { code } }) => {
    setBarcode(code);
    handleCheckinout(code);
  };

  const handleCheckinout = async value => {
    const data = await getBookByCallNumber(value);
    if (!data) {
      alert.error(`${value} was not found. Make sure the book is loaded`);
      return;
    }

    setBarcodeResult(data);
  };

  return (
    <Modal open={open} handleClose={_handleClose}>
      <Grid container>
        <Grid container item direction="column" md={isScannerOpen ? 6 : 12}>
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              Scan a barcode
            </Typography>
          </Grid>
          <Grid item container direction="row">
            <TextField
              tabIndex="1"
              ref={input}
              label="Barcode"
              autoFocus
              variant="outlined"
              onKeyDown={handleSubmit}
              value={barcode}
              onChange={({ target: { value } }) => setBarcode(value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className={classes.barcode}>
                    {Icons.Barcode}
                  </InputAdornment>
                )
              }}
            ></TextField>
            <ScannerIconButtons
              handleLaptopButton={() => setIsScannerOpen(!isScannerOpen)}
              isScannerOpen={isScannerOpen}
            ></ScannerIconButtons>
          </Grid>
          <Grid item>
            {barcodeResult.isCheckout ? (
              <GenerateCheckout data={barcodeResult} reset={reset} />
            ) : (
              <GenerateCheckin
                data={barcodeResult}
                reset={reset}
              ></GenerateCheckin>
            )}
          </Grid>
        </Grid>
        <Scanner open={isScannerOpen} onDetected={handleDetectedCode}></Scanner>
      </Grid>
    </Modal>
  );
};

const ScannerIconButtons = ({ handleLaptopButton, isScannerOpen }) => {
  const classes = useStyles();

  return (
    <div>
      <IconButton
        aria-label="Scan with Laptop"
        className={`${classes.laptopCamera} ${isScannerOpen && "active"}`}
        onClick={handleLaptopButton}
      >
        {Icons.LaptopCamera}
      </IconButton>
      <IconButton aria-label="Scan with phone" className={classes.phone}>
        {Icons.UsePhone}
      </IconButton>
    </div>
  );
};

const GenerateCheckin = ({ data, reset }) => {
  const alert = useAlert();
  const handleSubmit = async () => {
    try {
      await checkin(data.books_out_id);
      reset();
      alert.success(
        `Successfully checked in ${data.book_name} for ${data.student_name}`
      );
    } catch (error) {
      alert.error(
        `An error occured while checking in ${data.book_name} for ${data.student_name}`
      );
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.statContainer}>
      <Typography variant="h6">Checkin</Typography>
      <p>
        Author: <b>{data.author_name}</b>
      </p>
      <p>
        Title: <b>{data.book_name}</b>
      </p>
      <p>
        Call Number: <b>{data.call_number}</b>
      </p>
      <hr></hr>
      <p>
        Student Name: <b>{data.student_name}</b>
      </p>
      <p>
        Class: <b>{data.class}</b>
      </p>
      <p>
        Teacher: <b>{data.teacher_name}</b>
      </p>
      <hr></hr>
      <p>
        Check out on: <b>{data.check_out_date}</b>
      </p>
      <p>
        Check in on: <b>{data.check_in_on}</b>
      </p>
      <p>
        Due by:<b>{data.return_on}</b>
      </p>
      <p>
        Fine due: <b>{data.fine}</b>
      </p>
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        color="primary"
      >
        Check in
      </Button>
    </div>
  );
};

const GenerateCheckout = ({ data, reset }) => {
  const [selectList, setSelectList] = useState([]);
  const [selection, setSelection] = useState({});
  const classes = useStyles();
  const alert = useAlert();

  const handleSearch = async e => {
    const {
      target: { value }
    } = e;
    setSelectList(await searchForStudentsSelect(value));
  };

  const getSelection = (e, value) => {
    if (isNil(value)) return;
    setSelection({
      class: value.class,
      teacher: value.teacher,
      student_id: value.value,
      student_name: value.text
    });
  };

  const handleSubmit = async () => {
    try {
      await checkout(selection.student_id, data.book_id);
      reset();
      alert.success(
        `${selection.student_name} checked out ${data.book_name} due back on ###ADD DATE HERE ###`
      );
    } catch (error) {
      alert.error(
        `An error occured while checking out ${data.book_name} for ${selection.student_name}.`
      );
    }
  };

  return (
    <div className={classes.statContainer}>
      <Typography variant="h6">Check in</Typography>
      <p>
        Author: <b>{data.author_name}</b>
      </p>
      <p>
        Title: <b>{data.book_name}</b>
      </p>
      <p>
        Call Number: <b>{data.call_number}</b>
      </p>
      <hr></hr>
      <Autocomplete
        autoFocus
        label="Student"
        options={selectList}
        onChange={getSelection}
        getOptionLabel={option => option.text}
        ListboxProps={{ onClick: getSelection }}
        noOptionsText="No students found"
        selectOnFocus={true}
        renderInput={params => (
          <TextField
            {...params}
            onChange={handleSearch}
            label="Student"
            fullWidth
            variant="outlined"
          />
        )}
      ></Autocomplete>
      <p>
        Class: <b>{selection.class}</b>
      </p>
      <p>
        Teacher: <b>{selection.teacher}</b>
      </p>
      <hr></hr>
      <p>
        Check out on: <b>{data.check_out_date}</b>
      </p>
      <p>
        Due by:<b>{data.return_on}</b>
      </p>
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        color="primary"
      >
        Checkout
      </Button>
    </div>
  );
};
