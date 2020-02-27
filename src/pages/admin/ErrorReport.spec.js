import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Index from './index';

test('shows the current app settings',async () => {

    //Arrange
    const { getByText, getByRole, container, asFragment } = render(
      <Index />
    )

    //Act
    const [headingAppSettings, headingLibSettings] = await waitForElement(() => {
        return [
            getByText('App settings'), 
            getByText('Library settings')
        ]
    })

    //Assert
    expect(getByRole()).toHaveTextContent('')
    expect(getByRole('button')).toHaveAttribute('disabled')
});