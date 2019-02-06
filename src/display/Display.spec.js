import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Display from './Display.js';
import Dashboard from '../dashboard/Dashboard.js'
import Controls from '../controls/Controls.js';

describe('The Display component', () => {
    it('provides an indicator that gate is open by default', () => {
        const { getByText } = render(<Display/>);
        getByText(/open/i);
    });

    it('provides an indicator that gate is unlocked by default', () => {
        const { getByText } = render(<Display/>);
        getByText(/unlocked/i);
    });
});