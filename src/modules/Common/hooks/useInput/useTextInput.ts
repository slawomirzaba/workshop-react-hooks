import { useState, useCallback } from 'react';

type Inputs = HTMLInputElement | HTMLTextAreaElement;

type TextInputHook = {
    value: string;
    setValue: (value: string) => void;
    onChange: (event: React.ChangeEvent<Inputs>) => void;
    clear: () => void;
    inputProps: React.InputHTMLAttributes<Inputs>;
};

export const useTextInput = (initialValue: string, placeholder?: string): TextInputHook => {
    const [value, setValue] = useState(initialValue);
    const onChange = useCallback((e: React.ChangeEvent<Inputs>) => setValue(e.target.value), []);
    const clear = useCallback(() => setValue(''), []);
    return {
        value,
        setValue,
        clear,
        onChange,
        inputProps: {
            value,
            placeholder,
            onChange,
        },
    };
};
