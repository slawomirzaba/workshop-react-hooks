import { useState } from 'react';

interface useToggleI {
    value: boolean;
    toggleValue: () => void;
    setValue: (newValue: boolean) => void;
}

export const useToggle = (initialValue: boolean): useToggleI => {
    const [value, setValue] = useState(initialValue);

    const toggleValue = () => {
        setValue(prevValue => !prevValue);
    };

    return { value, toggleValue, setValue };
};
