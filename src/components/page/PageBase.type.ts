import { MUIDataTableColumnOptions } from 'mui-datatables';
import { JsonObj, DropdownListModel, Result } from 'types/generic.type';

export type PageBaseModel<TTableSchema, TSchema> = {
  defaultColumns: DefaultColumnModel<TTableSchema, TSchema>[];
  getAll: () => Promise<Result<TTableSchema[]>>;
  handleDeleteRow: (id: number) => Promise<Result<boolean>>;
  handleEditAddRow: (event: TSchema) => Promise<Result<TTableSchema[]>>;
  modal?: JSX.Element | null;
  dialogKey: keyof TTableSchema;
};

export type DefaultColumnModel<TTableSchema, TSchema> = {
  label?: string;
  name?: keyof TTableSchema | keyof TSchema | 'Edit' | 'Delete';
  modalTitle?: string;
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
    | { [key: string]: any }
    | TableCellModel;
  value?: string;
  onChange?: (value: { target: { value: string } }) => void;
  getDropDownItems?: () => Promise<Result<DropdownListModel[]>>;
  ref?: keyof TSchema;
};
// | EditColumnModel
// | DeleteColumnModel;

type TableCellModel = {
  filter: false;
  sort: false;
  empty: true;
  customBodyRender: (
    value: string,
    tableMeta: { rowData: JsonObj },
    updateValue: any
  ) => JSX.Element;
};

export type EditColumnModel = {
  label: '';
  name: 'Edit';
  options: {
    filter: false;
    sort: false;
    empty: true;
    customBodyRender: (
      value: string,
      tableMeta: { rowData: JsonObj },
      updateValue: any
    ) => JSX.Element;
  };
};

export type DeleteColumnModel = {
  label: '';
  name: 'Delete';
  options: {
    filter: false;
    sort: false;
    empty: true;
    customBodyRender: (
      value: string,
      tableMeta: { rowData: JsonObj },
      updateValue: any
    ) => JSX.Element;
  };
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
  getDropDownItems: () => Promise<Result<DropdownListModel[]>>;
};

export type ModalBaseModel<TTableSchema, TSchema> = {
  columns: DefaultColumnModel<TTableSchema, TSchema>[];
  open: boolean;
  handleClose: () => void;
  handleEditAddRow: (
    statementObject: TSchema
  ) => Promise<Result<TTableSchema[]>>;
  modalData: TSchema;
  reset: () => void;
  dialogKey: keyof TTableSchema;
};

export type DatatabelDataModel<T> = {
  Delete: any;
  Edit: any;
} & T;
