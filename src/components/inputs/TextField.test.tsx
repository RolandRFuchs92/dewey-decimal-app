import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TextField, { Textfield, TooltipTextField } from './TextField';

describe('TextField.tsx components', () => {
  describe('<TextField .../>', () => {
    const onChangeMethod = jest.fn();
    const componentTestId = 'ThisIsTheTestId';
    const someTestText =
      'This is totally not fake text to test in a component :)';
    function renderMethod(
      testId = componentTestId,
      label = '',
      defaultValue = '',
      onChange = onChangeMethod
    ) {
      return render(
        <TextField
          dataTestId={testId}
          defaultValue={defaultValue}
          label={label}
          onChange={onChange}
        />
      );
    }

    it('should render with a testId', () => {
      const { getByTestId } = renderMethod();
      getByTestId(componentTestId);
    });

    it('should render with the expected default value', () => {
      const { getByDisplayValue } = renderMethod(
        undefined,
        undefined,
        someTestText
      );
      getByDisplayValue(someTestText);
    });

    it('should render with the expected text', () => {
      const { getByText } = renderMethod(undefined, someTestText);
      getByText(someTestText);
    });

    it('should call the onChange event everytime a value is input', () => {
      const evt = jest.fn();
      const container = renderMethod(undefined, undefined, undefined, evt);
      const inputElement = container.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'a' } });
      expect(evt).toBeCalledTimes(1);
      expect(inputElement.value).toBe('a');
    });
  });

  describe('<Textfield .../>', () => {
    const testLabel = 'This is the test label';
    const testMethod = jest.fn();
    const testId = 'ThisIsTheTestId';
    const testValue = 'this is the test value';
    const testDefaultValue = 'this is some default value';
    function renderMethod(defaultValue = testDefaultValue, value = testValue) {
      return render(
        <Textfield
          defaultValue={defaultValue}
          label={testLabel}
          onChange={testMethod}
          dataTestId={testId}
          value={value}
        />
      );
    }

    it('should render with a testId', () => {
      const { getByTestId } = renderMethod();
      getByTestId(testId);
    });

    it('should should render with a label and a value', () => {
      const container = renderMethod();

      container.getByText(testLabel);
      container.getByDisplayValue(testValue);
    });

    it('should render default value when value is empty', () => {
      const container = renderMethod(testDefaultValue, '');

      container.getByDisplayValue(testDefaultValue);
    });
  });

  describe('<ToolTipTextField .../>', () => {});
});
