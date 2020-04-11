import React from 'react';
import { render, within } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import { setPageTitle } from 'utils/redux/global.action';
import AppWrapper from '__test/AppDepWrapper';
import { PermanentDrawerLeft } from './index';
import layoutSettings from './Layout.config.json';

describe('<Layout ..../>', () => {
  it('should render the layout with the correct menu options', async () => {
    const expectedPageTitle = 'THis is the expected Title';
    const rgx = new RegExp(expectedPageTitle, 'i');
    const container = render(
      <AppWrapper>
        <PermanentDrawerLeft pageTitle={expectedPageTitle} />
      </AppWrapper>
    );

    container.getAllByText(rgx);
    const checkinOutBtn = container.container.querySelector(
      '[aria-label="Checkin/out"]'
    );
    const toggleLightDarkBtn = container.container.querySelector(
      '[aria-label="Toggle light/dark mode"]'
    );

    const sidebar = within(container.getByTestId(/permadrawer/i));

    expect(checkinOutBtn).not.toBeNull();
    expect(toggleLightDarkBtn).not.toBeNull();

    layoutSettings.mainMenu.forEach(({ label }) => sidebar.getByText(label));
  });
});
