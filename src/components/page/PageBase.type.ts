export type DropdownListModel {
  
}

export type DefaultColumnModel = {
  name?: string,
  label: string,
  type?: {
    header: string,
  } | 'textField' | 'text' | 'select' ,
  options?: {
    display: boolean,
  }
  dropdownItems?: () => DropdownListModel,
  ref?: string
}

