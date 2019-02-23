import React, { FunctionComponent, ReactElement, useState, useRef, useEffect } from 'react';
import { useToggle, useTextInput } from '../../../Common/hooks';
interface PropsI {
    addItem: (title: string, description: string, isImportant: boolean) => void;
}

export const ItemForm: FunctionComponent<PropsI> = ({ addItem }: PropsI): ReactElement<PropsI> => {
    const title = useTextInput('', 'how is this task named?');
    const description = useTextInput('', 'what is this task about anyway?');
    const {
        value: isImportant,
        toggleValue: toggleIsImportant,
        setValue: setIsImportant,
    } = useToggle(false);
    const inputName = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!inputName.current) return;

        inputName.current.focus();
    }, []);

    const onSubmitItem = () => {
        addItem(title.value, description.value, isImportant);
        title.clear();
        description.clear();
        setIsImportant(false);
    };

    console.log('rendering...');
    return (
        <div className="item-form">
            <div className="item-form__field">
                <label className="item-form__field-label">Name:</label>
                <input
                    ref={inputName}
                    className="item-form__field-input"
                    {...title.inputProps}
                />
            </div>
            <div className="item-form__field">
                <label className="item-form__field-label">Description:</label>
                <textarea
                    className="item-form__field-textarea"
                    {...description.inputProps}
                />
            </div>
            <div className="item-form__field">
                <label className="item-form__field-label item-form__field-label--checkbox">
                    Is Important:
                </label>
                <input
                    className="item-form__field-input item-form__field-input--checkbox"
                    type="checkbox"
                    checked={isImportant}
                    onChange={toggleIsImportant}
                />
            </div>
            <button className="item-form__submit-button" onClick={onSubmitItem}>
                Submit
            </button>
        </div>
    );
};
