import React, { useState, useRef, ChangeEvent } from 'react';
import {
  TextField,
  makeStyles,
  InputAdornment,
  Typography,
  Button,
  IconButton,
  Grid
} from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { Autocomplete } from '@material-ui/lab';
import { isNil } from 'lodash';
import { addDays, format, parse } from 'date-fns';

import {
  friendlyClientDateFormatFromString,
  formatDateForClient
} from 'utils/businessRules';
import appSettings from 'appSettings.json';
import { useAlert } from 'utils/snackbarAlerts';
import Modal from 'components/modal';
import Icons from 'components/icons';
import Scanner from 'components/scanner';
import {
  JsonObj,
  GenericInputEvent,
  DropdownListModel
} from 'types/generic.type';
import { BarcodeResultModel } from 'pages/home/Home.type';
import { getBookByCallNumber } from 'pages/books/Book.service';
import { studentSearch } from 'pages/student/Student.service';
import { checkout, checkin } from 'pages/booksOut/Booksout.service';
import { RootReducerModel } from 'utils/redux/rootReducer.type';

import {
  ScanDataModel,
  ScannerIconButtonProps,
  GenerateCheckinProps,
  GenerateCheckoutProps,
  UserSelection,
  CheckoutData,
  ScanProps
} from './Scan.type';
import { ScannerCloseAction } from './Scanner.action';

const useStyles = makeStyles(theme => ({
  barcode: {
    fontSize: 35
  },
  statContainer: {
    '& p': {
      margin: 0,
      fontSize: 15
    },
    '& button': {
      marginTop: 15
    }
  },
  title: {
    marginBottom: 15
  },
  phone: {
    marginLeft: 15,
    '&.active': {
      color: theme.palette.error.light
    }
  },
  laptopCamera: {
    marginLeft: 15,
    '&.active': {
      color: theme.palette.error.light
    }
  },
  close: {
    cursor: 'pointer',
    fontSize: '2rem',
    color: theme.palette.grey[500],
    marginRight: theme.spacing(1),
    transition: 'all 0.4s',
    '&:hover': {
      color: theme.palette.grey[700]
    }
  }
}));

const defeaultCheckoutData: ScanDataModel = {
  book_id: 0,
  author_name: '',
  book_name: '',
  call_number: '',
  check_out_date: '',
  return_on: '',
  books_out_id: '',
  check_in_on: '',
  class: '',
  fine: '',
  isCheckout: true,
  student_name: '',
  teacher_name: ''
};

const ScannerPage = ({ open }: ScanProps) => {
  const classes = useStyles();
  const input = useRef(null);
  const dispatch = useDispatch();
  const [isScannerOpen, setIsScannerOpen] = useState(true);

  const [barcodeResult, setBarcodeResult] = useState<
    ScanDataModel | CheckoutData
  >(defeaultCheckoutData);
  const [barcode, setBarcode] = useState('');

  const alert = useAlert();

  const _handleClose = () => {
    setBarcode('');
    setBarcodeResult(defeaultCheckoutData);
    dispatch(ScannerCloseAction());
  };

  const handleSubmit = (e: GenericInputEvent & KeyboardEvent): void => {
    if (e.key !== 'Enter') return;

    const {
      target: { value }
    } = e;
    // @ts-ignore //TODO fix this error
    input.current.focus();
    setBarcode(value);
    handleCheckinout(value);
  };

  const reset = () => {
    setBarcode('');
    setBarcodeResult(defeaultCheckoutData);
  };

  const handleDetectedCode = ({ codeResult: { code } }: BarcodeResultModel) => {
    setBarcode(code);
    handleCheckinout(code);
  };

  const handleCheckinout = async (value: string) => {
    const data = (await getBookByCallNumber(value)).result;
    if (!data) {
      alert.error(`${value} was not found. Make sure the book is loaded`);
      return;
    }

    const fine = '0'; // TODO: calculate fine

    const scanData: ScanDataModel = {
      book_id: data.book_id,
      call_number: data.call_number,
      author_name: data.author_name,
      book_name: data.book_name,
      books_out_id: data.books_out_id
        ? data.books_out_id.toString()
        : undefined,
      check_in_on: data.check_in_date && data.check_in_date.toString(),
      check_out_date: data.check_out_date
        ? data.check_out_date.toString()
        : undefined,
      class: data.class,
      isCheckout: data.check_out_date === null,
      return_on: data.return_on ? data.return_on.toString() : undefined,
      student_name: data.student_name,
      teacher_name: data.teacher_name,
      fine
    };
    setBarcodeResult(scanData);
  };

  return (
    <Modal open={open} handleClose={_handleClose}>
      <Grid container>
        <Grid container item direction="column" md={isScannerOpen ? 6 : 12}>
          <Grid item container justify="space-between">
            <Grid item>
              <Typography variant="h5" className={classes.title}>
                Scan a barcode
              </Typography>
            </Grid>
            <Grid item className={classes.close} onClick={_handleClose}>
              {Icons.Close}
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <TextField
              tabIndex={1}
              ref={input}
              label="Barcode"
              autoFocus
              variant="outlined"
              // @ts-ignore
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
            />
            <ScannerIconButtons
              handleLaptopButton={() => setIsScannerOpen(!isScannerOpen)}
              isScannerOpen={isScannerOpen}
            />
          </Grid>
          <Grid item>
            {(barcodeResult as ScanDataModel).isCheckout ? (
              <GenerateCheckout
                data={barcodeResult as CheckoutData}
                reset={reset}
              />
            ) : (
              <GenerateCheckin
                data={barcodeResult as ScanDataModel}
                reset={reset}
              />
            )}
          </Grid>
        </Grid>
        <Scanner open={isScannerOpen} onDetected={handleDetectedCode}></Scanner>
      </Grid>
    </Modal>
  );
};

const ScannerIconButtons = ({
  handleLaptopButton,
  isScannerOpen
}: ScannerIconButtonProps) => {
  const classes = useStyles();

  return (
    <div>
      <IconButton
        aria-label="Scan with Laptop"
        className={`${classes.laptopCamera} ${isScannerOpen && 'active'}`}
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

const GenerateCheckin = ({ data, reset }: GenerateCheckinProps) => {
  const alert = useAlert();
  const handleSubmit = async () => {
    try {
      // TODO do something with the fine applicable here...
      const result = await checkin(Number(data.books_out_id));
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
        Check out on:{' '}
        <b>{friendlyClientDateFormatFromString(data.check_out_date!)}</b>
      </p>
      <p>
        Check in on: <b>{formatDateForClient(new Date())}</b>
      </p>
      <p>
        Due by:<b>{friendlyClientDateFormatFromString(data.return_on!)}</b>
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

const GenerateCheckout = ({ data, reset }: GenerateCheckoutProps) => {
  const [selectList, setSelectList] = useState<DropdownListModel[]>([]);
  const [selection, setSelection] = useState<UserSelection>();
  const classes = useStyles();
  const alert = useAlert();

  const checkoutDate = format(new Date(), appSettings.formatDate.to);
  const dueBack = format(
    addDays(new Date(), appSettings.checkout.daysAllowedOut),
    appSettings.formatDate.to
  );

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    const result = await studentSearch(value);
    setSelectList(result.result || []);
  };

  const getSelection = (event: ChangeEvent<{}>, value: JsonObj) => {
    if (isNil(value)) return;
    setSelection({
      class: +value.class,
      teacher: value.teacher.toString(),
      student_id: +value.value,
      student_name: value.text.toString()
    });
  };

  const handleSubmit = async () => {
    try {
      if (!selection || !data.book_id)
        return alert.error('A student and barcode selection is required.');

      const student_id = selection!.student_id;
      const book_id = Number(data.book_id);

      const result = await checkout(student_id, book_id);
      reset();
      return alert.success(
        `${selection?.student_name ?? 'Unknown'} checked out ${
          data.book_name
        } due back on ${result.result?.return_on}`
      );
    } catch (error) {
      return alert.error(
        `An error occured while checking out ${
          data.book_name
        } for ${selection?.student_name ?? 'Unknown'}.`
      );
    }
  };

  return (
    <div className={classes.statContainer}>
      <Typography variant="h6">Checkout</Typography>
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
        // @ts-ignore TODO Look look at this shit fail...
        options={selectList}
        //@ts-ignore //TODO Figure out why this is broken...
        onChange={getSelection!}
        getOptionLabel={option => option.text.toString()}
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
      />
      <p>
        Class: <b>{selection ? selection.class : ''}</b>
      </p>
      <p>
        Teacher: <b>{selection ? selection.teacher : ''}</b>
      </p>
      <hr></hr>
      <p>
        Check out on: <b>{data.call_number && checkoutDate}</b>
      </p>
      <p>
        Due by:<b>{data.call_number && dueBack}</b>
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

const mapStateToProps = (currentState: RootReducerModel) => {
  return {
    open: currentState.scan.open
  };
};
export default connect(mapStateToProps)(ScannerPage);
