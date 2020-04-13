import React from 'react';

import Barcode from './index';
import { render } from '@testing-library/react';

describe('<Barcode .../>', () => {
  it('should render the description', async () => {
    const testDescription = 'This is a description';
    const testValue = 'This would be the value';
    const container = render(
      <Barcode value={testValue} description={testDescription} />
    );

    container.getByText(testDescription);
  });
});
