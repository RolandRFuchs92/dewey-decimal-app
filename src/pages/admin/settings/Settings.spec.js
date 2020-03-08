import React from 'react';
import {render, within} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import appSettings from 'appSettings';
import TestSubject from './Settings';

jest.mock('appSettings', () => jest.fn());

const mockData = {
  fines: {
    isEnabled: true,
    rate: 'rate'
  },
  checkout: {
    daysAllowedOut: 'daysAllowedOut',
    isBusinessDays: true
  },
  fadeTransitionDuration: 'fadeDuration',
  databaseLocation: 'databaseLocation'
};


it('appSettings is imported and shows on page', async () => {
  appSettings.fines = mockData.fines;
  appSettings.checkout = mockData.checkout;
  appSettings.fadeTransitionDuration = mockData.fadeTransitionDuration;
  appSettings.fines = mockData.fines;
  appSettings.databaseLocation = mockData.databaseLocation;
  const { findByTestId } = render(<TestSubject/>); 

  async function getTestElement(testId) {
    const elemenet = await findByTestId(testId);
    const el = await within(elemenet);
    const result = await el.getByRole('textbox');
    return result;
  }
  
  const fadeDuration = await getTestElement('fadeDuration');
  const databaseLocation = await getTestElement('databaseLocation');
  const fineRate = await getTestElement('fineRate');
  const daysAllowedOut = await getTestElement('daysAllowedOut');

  expect(fadeDuration.value).toBe(mockData.fadeTransitionDuration);
  expect(databaseLocation.value).toBe(mockData.databaseLocation);
  expect(fineRate.value).toBe(mockData.fines.rate);
  expect(daysAllowedOut.value).toBe(mockData.checkout.daysAllowedOut);
});