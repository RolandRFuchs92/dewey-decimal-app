import React from 'react';
import { render, within } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import ErrorReport from './ErrorReport';
import * as svc from './ErrorReport.service';

describe('Error Report component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
    })

    it('shows loading before and after the application has loaded.',async () => {
        const container = render(<ErrorReport></ErrorReport>);
        const { getAllByTestId, findByTestId } = container;
        const loading = getAllByTestId('errors-loading');
        const mockProcessLog = jest.fn().mockResolvedValue([{"timestamp":"123", "message":"yes", "stack": "yes"}]);
        jest.mock('./ErrorReport.service', () => {
            return {
                __esModule: true,
                processErrorLog: mockProcessLog
            }
        })
    
    
        expect(loading).toHaveLength(1);
        const errorList = await findByTestId('errorlist');
        expect(errorList.children.length).toBeTruthy();    
    });
    
    it(`shows a message if no errors are found after load`, async () => {
        //Arrange
        const mockProcessLog = () => {
            debugger;
        };
        svc.processErrorLog = jest.fn().mockResolvedValue([]);

        const { findByTestId } = render(<ErrorReport/>);
        const element = await findByTestId('errorlist');

        const childContainer = within(element)
        const noErrorsTitle = await childContainer.findAllByTestId('no-errors');
        expect(noErrorsTitle).toBeTruthy();
    });
})

