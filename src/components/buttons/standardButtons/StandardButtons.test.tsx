import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { SubmitButton, ResetButton } from './index';

describe('<SubmitButton .../>', () => {
  const text = 'Submit';
  function renderMethod(onClick = () => {}) {
    return render(<SubmitButton onClick={onClick} />);
  }

  it('should render without crashing', () => {
    renderMethod();
  });

  it('should should render with "Submit" text', () => {
    const { getByText } = renderMethod();
    getByText(text);
  });

  it('should call the onclick method once', () => {
    const method = jest.fn();
    const { getByText } = renderMethod(method);

    const button = getByText(text);
    fireEvent.click(button);

    expect(method).toBeCalledTimes(1);
  });
});

describe('<ResetButton .../>', () => {
  const text = 'Reset';
  function renderMethod(onClick = () => {}) {
    return render(<ResetButton onClick={onClick} />);
  }
  it('should render without crashing', () => {
    renderMethod();
  });

  it('should render with Reset text', () => {
    const { getByText } = renderMethod();
    getByText(text);
  });

  it('should call the onClick method', () => {
    const method = jest.fn();
    const { getByText } = renderMethod(method);

    const button = getByText(text);

    fireEvent.click(button);

    expect(method).toBeCalledTimes(1);
  });
});
