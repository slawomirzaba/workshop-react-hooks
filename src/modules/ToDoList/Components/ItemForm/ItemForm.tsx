import React, { FunctionComponent, ReactElement, useState, useRef, useEffect } from 'react';

interface PropsI {
    addItem: (title: string, description: string, isImportant: boolean) => void;
}

export const ItemForm: FunctionComponent<PropsI> = ({ addItem }: PropsI): ReactElement<PropsI> => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const inputName = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!inputName.current) return;

        inputName.current.focus();
    }, []);

    const onSubmitItem = () => {
        addItem(title, description, isImportant);
        setTitle('');
        setDescription('');
        setIsImportant(false);
    };

    const toggleIsImportant = () => {
        setIsImportant((prevIsImportant: boolean) => !prevIsImportant);
    };

    console.log('rendering...');
    return (
        <div className="item-form">
            <div className="item-form__field">
                <label className="item-form__field-label">Name:</label>
                <input
                    ref={inputName}
                    className="item-form__field-input"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
            </div>
            <div className="item-form__field">
                <label className="item-form__field-label">Description:</label>
                <textarea
                    className="item-form__field-textarea"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setDescription(e.target.value)
                    }
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
