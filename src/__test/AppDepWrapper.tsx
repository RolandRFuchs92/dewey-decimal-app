import React from 'react';

import ReduxWrapper from './ReduxWrapper';
import HistoryWrapper from './HistoryWrapper';

export type AppWrapperProps = {
  children: JSX.Element | JSX.Element[];
};

export default ({ children }: AppWrapperProps) => {
  return (
    <ReduxWrapper>
      <HistoryWrapper>{children}</HistoryWrapper>
    </ReduxWrapper>
  );
};
