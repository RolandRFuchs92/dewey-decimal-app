import React from 'react';
import { render, within, fireEvent } from '@testing-library/react';

import YesNo from './YesNo';

describe('<YesNo .../>', () => {
  const dataTestId = 'ThisIsTheDataTestId';
  const titleText = 'This is the test titleText';
  const testText = 'This is the test text';

  const handleCloseFn = jest.fn();
  const handleNoFn = jest.fn();
  const handleYesFn = jest.fn();

  function renderMethod(
    handleClose = handleCloseFn,
    handleNo = handleNoFn,
    handleYes = handleYesFn,
    open = true,
    text = '',
    title = '',
    testId = dataTestId
  ) {
    return render(
      <YesNo
        handleClose={handleClose}
        handleNo={handleNo}
        handleYes={handleYes}
        open={open}
        text={text}
        title={title}
        dataTestId={testId}
      />
    );
  }

  it('should render with a testid', () => {
    const { getByTestId } = renderMethod(
      undefined,
      undefined,
      undefined,
      true,
      undefined,
      dataTestId
    );

    getByTestId(dataTestId);
  });

  it('should not render when open is false', () => {
    const { queryByTestId } = renderMethod(
      undefined,
      undefined,
      undefined,
      false
    );
    const result = queryByTestId(dataTestId);
    expect(result).toBeNull();
  });

  it('should render with the expected title,text yes and no buttons', () => {
    const { queryByTestId } = renderMethod(
      undefined,
      undefined,
      undefined,
      true,
      titleText,
      testText,
      dataTestId
    );

    const element = queryByTestId(dataTestId);
    within(element!).getByText(titleText);
    within(element!).getByText(testText);
    within(element!).getByText('Yes');
    within(element!).getByText('No');
  });

  it('should call the relevant functions when clicked.', () => {
    const { queryByTestId } = renderMethod(
      undefined,
      undefined,
      undefined,
      true,
      titleText,
      testText,
      dataTestId
    );

    const element = queryByTestId(dataTestId);
    const yesButton = within(element!).getByText('Yes');
    const noButton = within(element!).getByText('No');

    fireEvent.click(yesButton);
    fireEvent.click(noButton);

    expect(handleYesFn).toBeCalledTimes(1);
    expect(handleNoFn).toBeCalledTimes(1);
  });
});
