import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

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
    function renderMethod(
      defaultValue = testDefaultValue,
      value = testValue,
      onChangeMethod = testMethod
    ) {
      return render(
        <Textfield
          defaultValue={defaultValue}
          label={testLabel}
          onChange={onChangeMethod}
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

    it('should call the passed onChange method.', () => {
      const evt = jest.fn();
      const container = renderMethod(testDefaultValue, '', evt);
      const textBox = container.getByRole('textbox');
      fireEvent.change(textBox, { target: { value: 'a' } });
      expect(evt).toBeCalledTimes(1);
    });
  });

  describe('<ToolTipTextField .../>', () => {
    const onChange = jest.fn();
    const testLabel = 'Test Label...';
    const testValue = 'Test Value';
    const testDefaultValue = 'Test Default Value';
    const testToolTip = 'This is the test tooltip.';
    const testId = 'ThisIsTheTestId';

    function renderMethod() {
      return render(
        <TooltipTextField
          handleChange={onChange}
          value={testValue}
          label={testLabel}
          tooltip={testToolTip}
          dataTestId={testId}
          defaultValue={testDefaultValue}
        />
      );
    }

    it('should render a data-testId, label and a value', () => {
      const { getByText, getByTestId, getByDisplayValue } = renderMethod();
      getByTestId(testId);
      getByDisplayValue(testValue);
      getByText(testLabel);
    });

    it('should show a tooltip when the textbox is hovered over.', async () => {
      const container = renderMethod();
      const inputElement = container.getByRole('textbox');
      fireEvent.mouseEnter(inputElement);

      await container.findByText(testToolTip);
    });

    it('should call the expected onchange method when input is provided.', () => {
      const container = renderMethod();
      const input = container.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'a' } });

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
