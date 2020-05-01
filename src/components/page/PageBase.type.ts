import { MUIDataTableColumnOptions } from 'mui-datatables';
import { JsonObj, DropdownListModel, Result } from 'types/generic.type';

export type PageBaseModel<TTableSchema, TResult> = {
  defaultColumns: DefaultColumnModel<TTableSchema>[];
  getAll: () => Promise<Result<TResult[]>>;
  handleDeleteRow: (id: number) => Promise<Result<boolean>>;
  handleEditAddRow: (event: TResult) => Promise<Result<TResult[]>>;
  modal?: JSX.Element | null;
  dialogKey: keyof TResult;
};

export type DefaultColumnModel<TTableSchema> = {
  label?: string;
  name?: keyof TTableSchema;
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
    | { [key: string]: any };
  value?: string;
  onChange?: (value: { target: { value: string } }) => void;
  getDropDownItems?: () => Promise<DropdownListModel[]>;
  ref?: keyof TTableSchema;
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

export type ModalBaseModel<TResult, TAddOrUpdate> = {
  columns: DefaultColumnModel<TResult>[];
  open: boolean;
  handleClose: () => void;
  handleEditAddRow: (
    statementObject: TAddOrUpdate
  ) => Promise<Result<TResult[]>>;
  modalData: TResult;
  reset: () => void;
  dialogKey: keyof TResult;
};

export type DatatabelDataModel<T> = {
  Delete: any;
  Edit: any;
} & T;
