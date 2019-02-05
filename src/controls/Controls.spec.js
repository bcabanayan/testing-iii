// Test away!

import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Dashboard from '../dashboard/Dashboard.js';
import Controls from './Controls.js';

afterEach(cleanup);

describe('The Controls component', () => {
    // tests for close button
    it('provides a button to close the gate', () => {
        const { getByText } = render(<Controls/>);
        getByText(/close gate/i);
    });

    it('button to close gate switches to open gate after closing', () => {
        render(<Dashboard/>);
        const component = render(<Controls/>);
        const openButton = component.getByText(/close gate/i);
        
        fireEvent.click(openButton);

        expect(openButton).toHaveTextContent(/open gate/i);
    });

    it('provides a button to lock the gate', () => {
        const { getByText } = render(<Controls/>);
        getByText(/lock gate/i);
    });
});