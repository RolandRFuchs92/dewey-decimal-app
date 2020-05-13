import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import FormButtons from './index';

describe('<FormButtons .../>', () => {
  const resetTxt = 'Reset';
  const submitTxt = 'Submit';

  const defaultOnReset = () => {};
  const defaultOnSubmit = () => {};

  function renderMethod(onReset = defaultOnReset, onSubmit = defaultOnSubmit) {
    return render(<FormButtons onReset={onReset} onSubmit={onSubmit} />);
  }

  it('should render without crashing', () => {
    renderMethod();
  });

  it('should render with text reset and submit', () => {
    const container = renderMethod();
    container.getByText(resetTxt);
    container.getByText(submitTxt);
  });

  it('should call either button once if clicked', () => {
    const resetMethod = jest.fn();
    const submitMethod = jest.fn();
    const container = renderMethod(resetMethod, submitMethod);
    const resetButton = container.getByText(resetTxt);
    const submitButton = container.getByText(submitTxt);

    fireEvent.click(resetButton);
    fireEvent.click(submitButton);

    expect(resetMethod).toBeCalledTimes(1);
    expect(submitMethod).toBeCalledTimes(1);
  });
});
