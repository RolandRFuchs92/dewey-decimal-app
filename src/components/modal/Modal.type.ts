export type ModalModel = {
  handleClose: ((event: React.SyntheticEvent<{}, Event>) => void) | undefined;
  open: boolean;
  children: JSX.Element | JSX.Element[] | Element[] | Element;
  dataTestId?: string;
};
