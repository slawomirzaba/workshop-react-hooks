import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import { useTextInput, Inputs } from './useTextInput';
import { ChangeEvent } from 'react';


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
        const { result } = renderHook(() => useTextInput(EXPECTED.initialValue, EXPECTED.placeholder));
        const hook = result.current;
        expect(hook.value).toBe(EXPECTED.initialValue);
        expect(hook.inputProps.placeholder).toBe(EXPECTED.placeholder);
    });

    test('onChange updates value', () => {
        const { result } = renderHook(() => useTextInput(EXPECTED.initialValue, EXPECTED.placeholder));
        const { onChange } = result.current;
        act(() => onChange(EXPECTED.changeEvent as ChangeEvent<Inputs>));
        const hook = result.current;
        expect(hook.value).toBe(EXPECTED.changeEvent.target.value);
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
