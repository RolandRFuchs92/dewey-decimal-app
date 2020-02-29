import React from 'react';
import { render } from '@react';
import '@testing-library/jest-dom/extend-expect';

import ErrorReport from './ErrorReport';


it('shows loading before the application has loaded.',async () => {
    //Arrange
    const container = render(<ErrorReport></ErrorReport>);
    const { getAllByTestId } = container;
    const result = getAllByTestId('errors-loading');

    expect(result).toHaveLength(2);
});