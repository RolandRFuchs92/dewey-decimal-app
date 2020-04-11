import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AppWrapper from '__test/AppDepWrapper';
import MainMenuOptions from './index';
import { CreateListItemModel } from '../Layout.type';

describe('<MainMenuOptions />', () => {
  const testId = 'dataTestId';
  let menuItemCount = 0;

  const menuItems: CreateListItemModel[] = [
    {
      icon: 'Student',
      label: 'ITEM 1'
    },
    {
      icon: 'Student',
      label: 'HAVE KIDS',
      menuItems: [
        {
          icon: 'Student',
          label: 'child1'
        },
        {
          icon: 'Student',
          label: 'child2'
        }
      ]
    },
    {
      icon: 'Student',
      label: 'ITEM 2'
    }
  ];

  function renderMethod(mnuItems = menuItems) {
    return render(
      <AppWrapper>
        <MainMenuOptions menuItems={mnuItems} dataTestId={testId} />
      </AppWrapper>
    );
  }

  it('should render with a dataTestId', () => {
    const container = renderMethod();
    container.getByTestId(testId);
  });

  it('should render parents and children children are hidden by default', async () => {
    const container = renderMethod();

    container.getByText(/item 1/i);
    const parent = container.getByText(/have kids/i);
    container.getByText(/item 2/i);

    const child1Rgx = new RegExp(menuItems[1].menuItems![0].label, 'i');
    const child2Rgx = new RegExp(menuItems[1].menuItems![1].label, 'i');

    expect(container.queryByDisplayValue(child1Rgx)).toBeNull();
    fireEvent.click(parent);
    await container.findByText(child1Rgx);
    await container.findByText(child2Rgx);
  });
});
