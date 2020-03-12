export type DropdownListModel = {
  text: string;
  value: string;
}

export type DefaultColumnModel = {
  name?: string;
  label: string;
  type?: 
    | 'header'
    | 'textField' 
    | 'text' 
    | 'select' 
    | 'selectbox'
    | 'typography' 
    | 'date' 
    | 'datetime';
  options?: {
    display: boolean,
  };
  value?: string;
  onChange: (value: {target: {value: string;}}) => void;
  getDropDownItems?: () => Promise<DropdownListModel[]>;
  ref?: string;
}

export type ModalBaseHandleChange = (name: string) => ({ target: { value } }: {
  target: {
      value: string;
  };
}) => void
