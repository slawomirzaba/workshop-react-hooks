import React from 'react';
import { cleanup } from 'react-hooks-testing-library';
import { ItemForm } from '.';
import { render } from 'react-testing-library';
import { AuthContext } from '../../../../context';

describe('itemForm', () => {
    afterEach(cleanup);

    const GIVEN_AUTHENTICATION_PASSED = {
        authenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
    };
    const GIVEN_AUTHENTICATION_REJECTED = {
        authenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
    }

    test('should print information to log in if you are not authenticated', () => {
        const { getByTestId } = render(
            <AuthContext.Provider
                value={{
                ...GIVEN_AUTHENTICATION_REJECTED
            }}>
                <ItemForm addItem={jest.fn()} />
            </AuthContext.Provider>,
        );
        const unauthorizedInfo = getByTestId('unauthorized');
        expect(unauthorizedInfo).toBeTruthy();
    });

    test('should not print information to log in when you are authenticated', () => {
        const { queryByTestId } = render(
            <AuthContext.Provider
                value={{
                ...GIVEN_AUTHENTICATION_PASSED
            }}>
                <ItemForm addItem={jest.fn()} />
            </AuthContext.Provider>,
        );
        const unauthorizedInfo = queryByTestId('unauthorized');
        expect(unauthorizedInfo).toBeNull();
    });


    test('input element should have focus on mount', () => {
        const { getByTestId } = render(
                <AuthContext.Provider
                    value={{
                    ...GIVEN_AUTHENTICATION_PASSED
                }}>
                    <ItemForm addItem={jest.fn()} />
                </AuthContext.Provider>,
            );
        const givenRef = getByTestId('inputRef');
        expect(givenRef).toBe(document.activeElement);
    });
});
