import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Display from './Display.js';
import Dashboard from '../dashboard/Dashboard.js'
import Controls from '../controls/Controls.js';

afterEach(cleanup);

describe('The Display component', () => {
    it('provides an indicator that gate is open by default', () => {
        const { getByText } = render(<Display/>);
        getByText(/open/i);
    });

    it('provides an indicator that gate is unlocked by default', () => {
        const { getByText } = render(<Display/>);
        getByText(/unlocked/i);
    });

    it('displays closed when the closed button is clicked', () => {
        render(<Dashboard/>);
        const controls = render(<Controls/>);
        const closeButton = controls.getByText(/close gate/i);
        const display = render(<Display/>);
        const closedIndicator = display.getByText(/open/i);

        fireEvent.click(closeButton);

        expect(closedIndicator).toHaveTextContent(/closed/i);
    });

    it('displays open when the open button is clicked', () => {
        render(<Dashboard/>);
        const controls = render(<Controls/>);
        const closeButton = controls.getByText(/close gate/i);
        const display = render(<Display/>);
        const openIndicator = display.getByText(/open/i);

        fireEvent.click(closeButton);
        fireEvent.click(closeButton);

        expect(openIndicator).toHaveTextContent(/open/i);
    });
});