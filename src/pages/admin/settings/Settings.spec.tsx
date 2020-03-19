import React from 'react';
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import appSettings from 'appSettings.json';
import TestSubject from './Settings';

jest.mock('appSettings.json', () => jest.fn());

const mockData = {
  fines: {
    isEnabled: true,
    rate: 1
  },
  checkout: {
    daysAllowedOut: 1,
    isBusinessDays: true
  },
  fadeTransitionDuration: 1,
  databaseLocation: 'databaseLocation'
};

it('appSettings is imported and shows on page', async () => {
  appSettings.fines = mockData.fines;
  appSettings.checkout = mockData.checkout;
  appSettings.fadeTransitionDuration = mockData.fadeTransitionDuration;
  appSettings.fines = mockData.fines;
  appSettings.databaseLocation = mockData.databaseLocation;
  const { findByTestId } = render(<TestSubject />);

  async function getTestElement(testId: string) {
    const elemenet = await findByTestId(testId); // TODO
    const el = await within(elemenet);
    const result = await el.getByRole('textbox');
    return result;
  }

  const fadeDuration = (await getTestElement(
    'fadeDuration'
  )) as HTMLInputElement;
  const databaseLocation = (await getTestElement(
    'databaseLocation'
  )) as HTMLInputElement;
  const fineRate = (await getTestElement('fineRate')) as HTMLInputElement;
  const daysAllowedOut = (await getTestElement(
    'daysAllowedOut'
  )) as HTMLInputElement;

  expect(fadeDuration.value).toBe(`${mockData.fadeTransitionDuration}`);
  expect(databaseLocation.value).toBe(`${mockData.databaseLocation}`);
  expect(fineRate.value).toBe(`${mockData.fines.rate}`);
  expect(daysAllowedOut.value).toBe(`${mockData.checkout.daysAllowedOut}`);
});
