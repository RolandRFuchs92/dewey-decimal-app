import React,{useEffect, useState} from 'react';
import { TextField, Typography, Grid, MenuItem } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { toLower, isPlainObject } from 'lodash';

import Modal from 'components/modal';
import FormButtons from 'components/buttons/FormButtons';
import log from 'utils/logger';
import { useAlert } from 'utils/snackbarAlerts';

export default ({columns, open, handleClose, handleEditAddRow, modalData, reset}) => {
    const [val, setVal] = useState(modalData);
    const alert = useAlert();

    const handleOnChange = name => ({target: {value}}) =>{
        setVal({...val, [name]: value});
    }

    const handleSubmit = async () => {
        try {
            const result = await handleEditAddRow(val);        
            alert.success(`Successfully ${result === 'add' ? 'added' : 'updated'} ${val.name}!`);
            reset();
        } catch (error) {
            alert.error(`There was an error ${val.dewey_summary_id ? 'updating' : 'adding'} a field.`);
            log.error(`Error in src/components/page/ModalBase - Default - ${JSON.stringify(error)}`);
        }
    }

    useEffect(() => {
        setVal(modalData);
    },[open, modalData])

    const fields = convertJsonToModalFields(columns, handleOnChange, val);

    return <Modal {...{open, handleClose}}>
        {fields}
        <Grid item>
            <FormButtons onReset={() => setVal({})} onSubmit={handleSubmit}></FormButtons>
        </Grid>
    </Modal>
}


function convertJsonToModalFields(columns, handleOnChange, modalData){
    const result = columns.map((column,index)=> {
        const child = getElement({...column, onChange:handleOnChange(column.name), value:(modalData[column.name])});
        const el = <Grid item key={`${column.label}${index}`}>
            {child}
        </Grid>
        return el;
    });
    return result;
} 

function getElement({type, label, value, onChange, dropdownItems}){
    if(isPlainObject(type))
        return <Typography variant="h5">{type.header} {!!value && `(${value})`}</Typography>

    switch (toLower(type)) {
        case `textfield`:
            return <TextField fullWidth label={label} value={value || ''} onChange={onChange}></TextField>;
        case `typography`:
            return <TextField fullWidth label={label} value={value || ''} onChange={onChange}></TextField>;
        case 'datetime':
            return <TextField fullWidth label={label} value={value || ''} onChange={onChange}></TextField>;
        case 'selectbox':
            return <SelectBox {...{label, onChange, value, getDropdownItems: dropdownItems}}></SelectBox>
        default:
            return null;
    }
}


function DatePicker () {
    const handleDateChange = props => {
        console.log(props);
    }
    return  <KeyboardDatePicker
    disableToolbar
    variant="inline"
    format="MM/dd/yyyy"
    margin="normal"
    id="date-picker-inline"
    label="Date picker inline"
    value='2020/1/1'
    onChange={handleDateChange}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
}


function SelectBox({label, onChange,value,getDropdownItems}) {
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        (async () => {
            setRows(await getDropdownItems());
        })()
    },[])
    
    
            
    return <TextField select fullWidth label={label} value={value || ''} onChange={onChange}>
        {rows.map(row => <MenuItem key={row.value} value={row.value}>{row.text}</MenuItem>)}
    </TextField>;
}