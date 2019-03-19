import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import { useTextInput } from './useTextInput';

describe('useTextInput', () => {
    afterEach(cleanup);
    const EXPECTED = {
        placeholder: 'placeholderTest',
        initialValue: 'initTest',
        changeEvent: {
            target:{
                value: 'changedValueTest',
            }
        },
        afterClearValue: '',
    }

    test('initial values are set', () => {
        expect(true).toBe(false);
    });

    test('onChange updates value', () => {
        expect(true).toBe(false);
    });

    test('clear method clears value to empty string', () => {
        const { result } = renderHook(() => useTextInput(EXPECTED.initialValue, EXPECTED.placeholder));
        const { clear, value } = result.current;
        expect(value).toBe(EXPECTED.initialValue);
        act(() => clear());
        const hook = result.current;
        expect(hook.value).toBe(EXPECTED.afterClearValue);

    });
})
