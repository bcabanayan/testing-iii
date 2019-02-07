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

    it('displays open when the open button is clicked', () => {
        render(<Dashboard/>);
        const controls = render(<Controls/>);
        const closeButton = controls.getByText(/close gate/i);
        const lockButton = controls.getByText(/lock gate/i);
        const display = render(<Display/>);
        const lockedIndicator = display.getByText(/unlocked/i);

        fireEvent.click(closeButton);
        fireEvent.click(lockButton);

        expect(lockedIndicator).toHaveTextContent(/locked/i);
    });

    it('displays unlocked when the unlock button is clicked', () => {
        render(<Dashboard/>);
        const controls = render(<Controls/>);
        const closeButton = controls.getByText(/close gate/i);
        const lockButton = controls.getByText(/lock gate/i);
        const display = render(<Display/>);
        const unlockedIndicator = display.getByText(/unlocked/i);

        fireEvent.click(closeButton);
        fireEvent.click(lockButton);
        fireEvent.click(lockButton);

        expect(unlockedIndicator).toHaveTextContent(/unlocked/i);
    });

    it('displays green when gate is open', () => {
        const display = render(<Display closed={false}/>);
        const openIndicator = display.getByText(/open/i);
        expect(openIndicator).toHaveClass('led green-led');
    });

    it('displays red when gate is closed', () => {
        const display = render(<Display closed={true}/>);
        const closedIndicator = display.getByText(/closed/i);
        expect(closedIndicator).toHaveClass('led red-led');
    });

    it('displays green when gate is unlocked', () => {
        const display = render(<Display locked={false}/>);
        const unlockedIndicator = display.getByText(/unlocked/i);
        expect(unlockedIndicator).toHaveClass('led green-led');
    });

    it('displays red when gate is locked', () => {
        const display = render(<Display locked={true}/>);
        const lockedIndicator = display.getByText(/locked/i);
        expect(lockedIndicator).toHaveClass('led red-led');
    });
});