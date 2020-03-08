import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { RawErrorIndicator as TestSubject } from 'components/icons/Indicator';

describe("Error Indicator", () => {
    it('should display the count to the user', () => {
        const { getByText } = render(<TestSubject count={10}/>);

        const result = getByText('10 application errors.')

        expect(result).toBeTruthy();
    });

    it('should be unmount when there are no errors', () => {
        const container = render(<TestSubject count={0}/>);

        expect(container.container.innerHTML).toBe("");
    });
})