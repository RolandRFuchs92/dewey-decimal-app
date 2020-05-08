import React, { useEffect, useState } from 'react';
import {
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { DatePicker as DatePickerImport } from '@material-ui/pickers';
import { toLower, isNil } from 'lodash';
import { format } from 'date-fns';

import Modal from 'components/modal';
import FormButtons from 'components/buttons/formButtons';
import { useAlert } from 'utils/snackbarAlerts';

import {
  DefaultColumnModel,
  ModalBaseHandleChange,
  ModalBaseModel,
  DatePickerModel,
  SelectBoxModel
} from './PageBase.type';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DropdownListModel } from 'types/generic.type';

export default <TTableSchema, TSchema>({
  columns,
  open,
  handleClose,
  handleEditAddRow,
  modalData,
  reset,
  dialogKey
}: ModalBaseModel<TTableSchema, TSchema>) => {
  const [val, setVal] = useState<TSchema | undefined>();
  const alert = useAlert();

  useEffect(() => {
    setVal({ ...modalData! });
  }, [modalData]);

  const handleOnChange = (name: string) => ({
    target: { value }
  }: {
    target: { value: string | boolean };
  }) => {
    const key =
      columns.filter(({ name: colName }) => colName === name)[0].ref || name;

    // @ts-ignore
    setVal({ ...val, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const statementObject = { ...val } as TTableSchema;
      const refColumns = columns.filter(column => {
        let firstChar: string = '';
        if (column.name !== null && column.name !== undefined)
          firstChar = (column.name as string).substr(0, 1);

        return column.ref || firstChar === firstChar.toUpperCase();
      });
      refColumns.forEach(({ name }) => {
        if (name !== null && name !== undefined)
          delete statementObject[name as keyof TTableSchema];
      });

      const result = await handleEditAddRow(
        (statementObject as unknown) as TSchema
      );
      alert.success(
        `Successfully TODO(ADDD OR UPDATED) ${
          val ? statementObject[dialogKey] : 'new row'
        }`
      );
      reset();
    } catch (error) {
      alert.error(
        `There was an error (TODO ADDING OR UPDATING) a field.` // TODO
      );
    }
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <Fields
        columns={columns}
        handleOnChange={handleOnChange}
        modalData={val!}
      />
      <Grid item>
        <FormButtons
          onReset={() => setVal(modalData)}
          onSubmit={handleSubmit}
        />
      </Grid>
    </Modal>
  );
};

export type FieldProps<TTableSchema, TSchema> = {
  columns: DefaultColumnModel<TTableSchema, TSchema>[];
  handleOnChange: ModalBaseHandleChange;
  modalData: TSchema;
};

function Fields<TTableSchemaModel, TSchema>({
  columns,
  handleOnChange,
  modalData
}: FieldProps<TTableSchemaModel, TSchema>): JSX.Element {
  const result = columns.map((column, index) => {
    const hasNoRefButHasColumnName =
      column.ref === undefined && !isNil(column.name);
    // @ts-ignore TODO FIX THIS
    const value: string = hasNoRefButHasColumnName
      ? modalData[column.name! as keyof TSchema]
      : !isNil(column.ref)
      ? modalData[column.ref]
      : '0';

    const child = CreateElement({
      ...(column as TSchema),
      onChange: handleOnChange((column.name && column.name.toString()) || ''),
      value
    });
    const el = (
      <Grid item key={`${column.label}${index}`}>
        {child}
      </Grid>
    );
    return el;
  });
  return <>{result}</>;
}

function CreateElement<TTableSchema, TSchema>({
  type,
  label,
  value,
  onChange,
  modalTitle,
  getDropDownItems
}: DefaultColumnModel<TTableSchema, TSchema>) {
  if (isNil(type)) return null;

  switch (toLower(type)) {
    case 'header':
      const header = value ? `${modalTitle} (${value})` : modalTitle;

      return <Typography variant="h5">{header}</Typography>;
    case 'text':
    case `textfield`:
      return (
        <TextField
          fullWidth
          label={label}
          value={value || ''}
          onChange={onChange}
        />
      );
    case `typography`:
      return (
        <TextField
          fullWidth
          label={label}
          value={value || ''}
          onChange={onChange}
        />
      );
    case 'date':
    case 'datetime':
      return (
        <DatePicker
          label={label!}
          value={value}
          onChange={isNil(onChange) ? () => {} : onChange}
        />
      );
    case 'check':
      return (
        <CheckBox
          label={label!}
          value={value ? true : false}
          onChange={onChange!}
        />
      );
    case 'select':
    case 'selectbox':
      return (
        <SelectBox
          label={label!}
          onChange={
            isNil(onChange)
              ? (value: { target: { value: string } }): void => {}
              : onChange
          }
          value={isNil(value) ? '' : value}
          getDropDownItems={getDropDownItems!}
        />
      );
    default:
      return null;
  }
}

export type CheckboxProps = {
  label: string;
  onChange: (evt: {
    target: {
      value: string | boolean;
    };
  }) => void;
  value: boolean;
};

function CheckBox({ label, onChange, value }: CheckboxProps) {
  const handleChange = () => {
    onChange({ target: { value: !value } });
  };

  return (
    <FormControlLabel
      control={
        <Checkbox checked={value} onChange={handleChange} name="label" />
      }
      label={label}
    />
  );
}

function DatePicker({ label, onChange, value }: DatePickerModel) {
  const handleDateChange = (date: MaterialUiPickersDate) => {
    const formattedDate = format(date as Date, 'dd MMM yyyy');
    onChange({ target: { value: formattedDate } });
  };

  return (
    <DatePickerImport
      format="dd MMM yyyy"
      variant="inline"
      disableToolbar
      label={label}
      value={value || null}
      onChange={handleDateChange}
      animateYearScrolling
    />
  );
}

function SelectBox({
  label,
  onChange,
  value,
  getDropDownItems
}: SelectBoxModel) {
  const [rows, setRows] = useState<DropdownListModel[]>([]);
  const alert = useAlert();
  useEffect(() => {
    (async () => {
      const result = await getDropDownItems();
      if (!result.result || !result.result.length)
        alert.warning(result.message || 'There are no dropdown items.');

      setRows(result.result || []);
    })();
  }, []);

  return (
    <TextField
      select
      fullWidth
      label={label}
      value={value || ''}
      onChange={onChange}
    >
      {rows.map((row: DropdownListModel) => (
        <MenuItem key={row.value} value={row.value}>
          {row.text}
        </MenuItem>
      ))}
    </TextField>
  );
}
