import React from 'react';
import { render } from '@testing-library/react';

import QrCode from './index';

describe('<QrCode .../>', () => {
  it('should render a description and qrCode with crash', () => {
    const testDescription = 'This is a test description.';
    const testValue = 'This is the value';
    const container = render(
      <QrCode description={testDescription} value={testValue} />
    );

    container.getByText(testDescription);
    container.getByText(testValue);
  });
});
