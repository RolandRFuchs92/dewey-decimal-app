export type DropdownListModel {
  
}

export type DefaultColumnModel = {
  name?: string,
  label: string,
  type?: {
    header: string,
  } | 'textField' 
    | 'text' 
    | 'select' 
    | 'selectbox'
    | 'typography' 
    | 'date' 
    | 'datetime'
  options?: {
    display: boolean,
  }
  dropdownItems?: () => DropdownListModel,
  ref?: string
}

export type ModalBaseHandleChange = (name: string) => ({ target: { value } }: {
  target: {
      value: string;
  };
}) => void
