import React from 'react';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library';
import { Container } from './Container';

describe('Services Container', () => {
    afterEach(cleanup);

    it('test', () => {
        const a = render(<Container />);

        console.log(a);
    });
});
