import React from 'react';

import TableButtons from './index';
import Icon from 'components/icons';
import { render, fireEvent } from '@testing-library/react';

describe('<TableButtons .../>', () => {
  it('should return a json object with expected props', () => {
    const result = TableButtons(jest.fn(), 'text', Icon.Student, 'string');
    expect(result.name).toBeTruthy();
    expect(result.options.empty).toBe(true);
    expect(result.options.filter).toBe(false);
    expect(result.options.sort).toBe(false);
  });

  it('should return a component that can be clicked to call a method once', () => {
    const method = jest.fn();
    const result = TableButtons(method, 'text', Icon.Student, 'string');
    const { container } = render(
      <>{result.options.customBodyRender(null, { rowData: {} })}</>
    );

    const button = container.querySelector('svg');

    fireEvent.click(button!);

    expect(method).toBeCalledTimes(1);
  });
});
