import React from 'react';
import {act, render, fireEvent, waitForElement, findAllByRole } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Settings from './settings';

it('shows the current app settings', async () => {
    //Arrange
    const { getByText, getByRole, container, asFragment } = render(
      <Settings />
    )

    //Act
    await waitForElement(() => fireEvent.click(getByText('Submit')));
    
    //Assert
    expect(getByText('Willy')).toBeTruthy();
  });