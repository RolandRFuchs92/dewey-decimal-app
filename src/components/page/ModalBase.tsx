import React,{useEffect, useState, SyntheticEvent, ChangeEvent} from 'react';
import { TextField, Typography, Grid, MenuItem } from '@material-ui/core';
import { DatePicker as DatePickerImport} from '@material-ui/pickers';
import { toLower, isPlainObject, isNil } from 'lodash';
import { format } from 'date-fns';

import Modal from 'components/modal';
import FormButtons from 'components/buttons/FormButtons';
import log from 'utils/logger';
import { useAlert } from 'utils/snackbarAlerts';
import { SyntheticEventData } from 'react-dom/test-utils';

import { DefaultColumnModel, ModalBaseHandleChange, DropdownListModel } from './PageBase.type';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

type ModalBaseModel = {
    columns: DefaultColumnModel[];
    open: boolean;
    handleClose: () => void;
    handleEditAddRow: (statementObject:{[x: string]: any;}) => 'add' | null;
    modalData: {[key: string]: any};
    reset: () => void;
}


export default ({columns, open, handleClose, handleEditAddRow, modalData, reset}: ModalBaseModel) => {
    const [val, setVal] = useState(modalData);
    const alert = useAlert();

    const handleOnChange = (name: string) => ({target: {value}}: {target: {value: string}}) =>{
        const key = columns.filter(({name: colName}) => colName === name )[0].ref || name;
        setVal({...val, [key]: value});
    }

    const handleSubmit = async () => {
        try {
            const statementObject = {...val};
            const refColumns = columns.filter(column => {
                let firstChar: string ='';
                if(column.name !== null && column.name !== undefined) firstChar = column.name.substr(0,1);

               return column.ref || firstChar === firstChar.toUpperCase();
            });
            refColumns.forEach(({ name }) => {
                if(name !== null && name !== undefined)
                    delete statementObject[name]
            });
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

    const Fields = () => {
        return <>{convertJsonToModalFields(columns, handleOnChange, val)}</>
    } 

    return <Modal {...{open, handleClose}}>
        <Fields />
        <Grid item>
            <FormButtons onReset={() => setVal({})} onSubmit={handleSubmit}></FormButtons>
        </Grid>
    </Modal>
}


function convertJsonToModalFields(
    columns: DefaultColumnModel[], 
    handleOnChange: ModalBaseHandleChange, 
    modalData: {[key: string]: string}){
    const result = columns.map((column,index)=> {
        const value: string = column.ref === undefined && !isNil(column.name) 
            ? modalData[column.name] 
            : !isNil(column.ref) 
                ? modalData[column.ref] 
                : '0';
        const child = getElement({...column, onChange:handleOnChange(column.name || ''), value});
        const el = <Grid item key={`${column.label}${index}`}>
            {child}
        </Grid>
        return el;
    }); 
    return result;
} 

function getElement({type, label, value, onChange, getDropDownItems}: DefaultColumnModel){
    if(isNil(type)) return null;

    switch (toLower(type)) {
        case 'header':
            return <Typography variant="h5">{label} {value}</Typography>
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
            return <SelectBox 
                        label={label} 
                        onChange={onChange} 
                        value={value} 
                        getDropDownItems={getDropDownItems as () => Promise<DropdownListModel[]>} />
        default:
            return null;
    }
}

type DatePickerModel = {
    label: string;
    value?: string;
    onChange: (value: {target: {value: string}}) => void;
}

function DatePicker ({label, value, onChange}: DatePickerModel) {
    const handleDateChange = (date: MaterialUiPickersDate) => {
        const formattedDate = format(date as Date,'dd MMM yyyy');
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

type SelectBoxModel = {
    label: string;
    onChange: (value: {target: {value: string;}}) => void;
    value?: string;
    getDropDownItems: () => Promise<DropdownListModel[]>;
}

function SelectBox({label, onChange, value, getDropDownItems}: SelectBoxModel) {
    const [rows, setRows] = useState<DropdownListModel[]>([]);
    
    useEffect(() => {
        (async () => {
            const result  = await getDropDownItems();
            setRows(result);
        })()
    },[])
    
    
    return <TextField select fullWidth label={label} value={value || ''} onChange={onChange}>
        {rows.map((row: DropdownListModel) => <MenuItem key={row.value} value={row.value}>{row.text}</MenuItem>)}
    </TextField>;
}
