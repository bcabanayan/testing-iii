// Test away!

import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Dashboard from '../dashboard/Dashboard.js';
import Controls from './Controls.js';

afterEach(cleanup);

describe('The Controls component', () => {
    it('provides a button to close the gate', () => {
        const { getByText } = render(<Controls/>);
        getByText(/close gate/i);
    });

    it('provides a button to lock the gate', () => {
        const { getByText } = render(<Controls/>);
        getByText(/lock gate/i);
    });

    it('button to close gate switches to open gate after closing', () => {
        render(<Dashboard/>);
        const component = render(<Controls/>);
        const openButton = component.getByText(/close gate/i);

        fireEvent.click(openButton);

        expect(openButton).toHaveTextContent(/open gate/i);
    });

    it('clicking open button after closing toggles button back to close option', () => {
        render(<Dashboard/>);
        const component = render(<Controls/>);
        const openButton = component.getByText(/close gate/i);

        fireEvent.click(openButton);
        fireEvent.click(openButton);

        expect(openButton).toHaveTextContent(/close gate/i);
    });

    it('cannot lock gate without closing gate first', () => {
        render(<Dashboard/>);
        const component = render(<Controls/>);
        const lockButton = component.getByText(/lock gate/i);

        fireEvent.click(lockButton);

        expect(lockButton).toHaveTextContent(/lock gate/i);
    });

    it('can lock gate after closing', () => {
        render(<Dashboard/>);
        const component = render(<Controls/>);
        const openButton = component.getByText(/close gate/i);
        const lockButton = component.getByText(/lock gate/i);

        fireEvent.click(openButton);
        fireEvent.click(lockButton);

        expect(lockButton).toHaveTextContent(/unlock gate/i);
    });

    it('can unlock gate after locking', () => {
        render(<Dashboard/>);
        const component = render(<Controls/>);
        const openButton = component.getByText(/close gate/i);
        const lockButton = component.getByText(/lock gate/i);

        fireEvent.click(openButton);
        fireEvent.click(lockButton);
        fireEvent.click(lockButton);

        expect(lockButton).toHaveTextContent(/lock gate/i);
    });
});