import React from 'react';
import { render } from '@testing-library/react';

import Modal from './index';

describe('<Modal .../>', () => {
  const defaultChild = <h1>Default child</h1>;
  const defaultClose = jest.fn();
  const testId = 'ThisIsTheTestId';

  function renderMethod(
    open = false,
    handleClose = defaultClose,
    children: JSX.Element | JSX.Element[] = defaultChild
  ) {
    return render(
      <Modal handleClose={handleClose} open={open} dataTestId={testId}>
        {children}
      </Modal>
    );
  }

  it('should should not render if open is set to false', () => {
    const container = renderMethod();
    const result = container.queryByTestId(testId);

    expect(result).toBeNull();
  });

  it('should render with a testid', () => {
    const container = renderMethod(true);
    container.getByTestId(testId);
  });

  it('should render a child', () => {
    const child = <h1>Hello</h1>;
    const container = renderMethod(true, undefined, child);
    container.getByRole('heading');
  });

  it('should render multiple children', async () => {
    const child1Text = 'Hello';
    const child2Text = 'Some Stub :)';
    const child3Text = 'And Another one.';
    const children = [
      <h1>{child1Text}</h1>,
      <sub>{child2Text}</sub>,
      <p>{child3Text}</p>
    ];
    const container = renderMethod(true, undefined, children);

    await container.findByText(child1Text);
    await container.findByText(child2Text);
    await container.findByText(child3Text);
  });
});
