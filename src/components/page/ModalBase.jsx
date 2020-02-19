import React,{useEffect, useState} from 'react';
import { TextField, Typography, Grid, MenuItem } from '@material-ui/core';
import { DatePicker as DatePickerImport} from '@material-ui/pickers';
import { toLower, isPlainObject } from 'lodash';
import { format } from 'date-fns';

import Modal from 'components/modal';
import FormButtons from 'components/buttons/FormButtons';
import log from 'utils/logger';
import { useAlert } from 'utils/snackbarAlerts';

export default ({columns, open, handleClose, handleEditAddRow, modalData, reset}) => {
    const [val, setVal] = useState(modalData);
    const alert = useAlert();

    const handleOnChange = name => ({target: {value}}) =>{
        const key = columns.filter(({name: colName}) => colName === name )[0].ref || name;
        setVal({...val, [key]: value});
    }

    const handleSubmit = async () => {
        try {
            const statementObject = {...val};
            const refColumns = columns.filter(column => column.ref);
            refColumns.forEach(({ name }) => delete statementObject[name]);
            const result = await handleEditAddRow(statementObject);        
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
        const value = `${column.ref === undefined ? modalData[column.name] : modalData[column.ref] || '0'}`;
        const child = getElement({...column, onChange:handleOnChange(column.name), value});
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
        case 'text':
        case `textfield`:
            return <TextField fullWidth label={label} value={value || ''} onChange={onChange}></TextField>;
        case `typography`:
            return <TextField fullWidth label={label} value={value || ''} onChange={onChange}></TextField>;
        case 'date':
        case 'datetime':
            return <DatePicker {...{label, value, onChange}}></DatePicker>
        case 'select':
        case 'selectbox':
            return <SelectBox {...{label, onChange, value, getDropdownItems: dropdownItems}}></SelectBox>
        default:
            return null;
    }
}


function DatePicker ({label, value, onChange}) {
    const handleDateChange = date => {
        const formattedDate = format(date,'dd MMM yyyy');
        onChange({ target: {value: formattedDate}});
    }

    return  <DatePickerImport
        format='dd MMM yyyy'
        variant="inline"
        disableToolbar
        label={label}
        value={value || null}
        onChange={handleDateChange}
        animateYearScrolling
      />
}


function SelectBox({label, onChange,value,getDropdownItems}) {
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        (async () => {
            const result  = await getDropdownItems();
            setRows(result);
        })()
    },[])
    
    
    return <TextField select fullWidth label={label} value={value || ''} onChange={onChange}>
        {rows.map(row => <MenuItem key={row.value} value={row.value}>{row.text}</MenuItem>)}
    </TextField>;
}
