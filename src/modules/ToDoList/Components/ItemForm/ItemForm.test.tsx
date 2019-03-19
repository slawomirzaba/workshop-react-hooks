import React from 'react';
import { cleanup } from 'react-hooks-testing-library';
import { ItemForm } from '.';
import { AuthContext } from '../../../../context';

describe('itemForm', () => {
    afterEach(cleanup);

    // use getByTestId/queryByTestId

    test('should print information to log in if you are not authenticated', () => {
        expect(true).toBe(false);
    });

    test('should not print information to log in when you are authenticated', () => {
        expect(true).toBe(false);
    });

    test('input element should have focus on mount', () => {
        expect(true).toBe(false);
    });
});
