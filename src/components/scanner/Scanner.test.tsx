import React from 'react';
import { render } from '@testing-library/react';
import Quagga from 'quagga';

import Scanner from './index';

jest.mock('quagga');

describe('<Scanner .../>', () => {
  const onDetectedMethod = jest.fn();

  it('should no render if open is off', () => {
    const container = render(
      <Scanner onDetected={onDetectedMethod} open={false} />
    );
    const renderedComp = container.baseElement.querySelector('div');

    expect(renderedComp?.childElementCount).toBe(0);
  });

  it('should render with title', () => {
    const container = render(
      <Scanner onDetected={onDetectedMethod} open={true} />
    );

    container.getByText(/display barcode to easily checkin\/out/i);
  });
});
