import { MUIDataTableColumnOptions } from 'mui-datatables';
import { JsonObj } from 'types/Generic';

export type DropdownListModel = {
  text: string;
  value: string;
};

export type PageBaseModel = {
  defaultColumns: DefaultColumnModel[];
  getAll: () => Promise<JsonObj[]>;
  handleDeleteRow: (rowData: { [key: string]: string }) => Promise<true>;
  handleEditAddRow: (event: JsonObj | null) => Promise<'add' | 'update'>;
  modal?: JSX.Element | null;
};

export type DefaultColumnModel = {
  label?: string;
  name?: string;
  type?:
    | 'header'
    | 'textfield'
    | 'text'
    | 'select'
    | 'selectbox'
    | 'typography'
    | 'date'
    | 'datetime'
    | 'check';
  options?:
    | {
        display: boolean;
      }
    | MUIDataTableColumnOptions
    | { [key: string]: any };
  value?: string;
  onChange?: (value: { target: { value: string } }) => void;
  getDropDownItems?: () => Promise<DropdownListModel[]>;
  ref?: string;
};

export type ModalBaseHandleChange = (
  name: string
) => ({
  target: { value }
}: {
  target: {
    value: string;
  };
}) => void;

export type DatePickerModel = {
  label: string;
  value?: string;
  onChange: (value: { target: { value: string } }) => void;
};

export type SelectBoxModel = {
  label: string;
  onChange: (value: { target: { value: string } }) => void;
  value?: string;
  getDropDownItems: () => Promise<DropdownListModel[]>;
};

export type ModalBaseModel = {
  columns: DefaultColumnModel[];
  open: boolean;
  handleClose: () => void;
  handleEditAddRow: (statementObject: {
    [x: string]: any;
  }) => Promise<'add' | null>;
  modalData: { [key: string]: any };
  reset: () => void;
};

export type DatatabelDataModel<T> = {
  Delete: any;
  Edit: any;
} & T;
