import React from 'react';
import { render } from '@react';
import '@testing-library/jest-dom/extend-expect';

import ErrorReport from './ErrorReport';

test('shows the current app settings',async () => {
    const container = render(<ErrorReport></ErrorReport>);
    const {getByTestId} = container;
    const errorlist = getByTestId('errorlist');
});