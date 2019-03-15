import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import { useToggle } from './useToggle';

describe('useToggle', () => {
    afterEach(cleanup);

    it('should correct init value', () => {
        const { result } = renderHook(() => useToggle(true));
        const { value } = result.current;

        expect(value).toEqual(true);
    });

    it('should correct toggle value from false to true', () => {
        const { result } = renderHook(() => useToggle(true));
        const { toggleValue } = result.current;

        act(() => toggleValue());
        const hookResult = result.current;

        expect(hookResult.value).toEqual(false);
    });

    it('should correct toggle value from true to false', () => {
        const { result } = renderHook(() => useToggle(false));
        const { toggleValue } = result.current;

        act(() => toggleValue());
        const hookResult = result.current;

        expect(hookResult.value).toEqual(true);
    });

    it('should correct set value to true', () => {
        const { result } = renderHook(() => useToggle(false));
        const { setValue } = result.current;

        act(() => setValue(true));
        const hookResult = result.current;

        expect(hookResult.value).toEqual(true);
    });

    it('should correct set value to false', () => {
        const { result } = renderHook(() => useToggle(true));
        const { setValue } = result.current;

        act(() => setValue(false));
        const hookResult = result.current;

        expect(hookResult.value).toEqual(false);
    });
});
