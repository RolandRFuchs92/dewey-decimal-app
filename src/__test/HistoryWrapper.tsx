import * as React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

export type HistoryWrapperProps = {
  children: JSX.Element | JSX.Element[];
};
export default ({ children }: HistoryWrapperProps) => {
  return <Router>{children}</Router>;
};
