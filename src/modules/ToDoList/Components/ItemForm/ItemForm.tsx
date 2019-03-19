import React, {FunctionComponent, ReactElement, useState} from 'react';

interface PropsI {
    addNewItem: (title: string, description: string, isImportant: boolean) => void
}

export const ItemForm: FunctionComponent<PropsI> = ({addNewItem}:PropsI): ReactElement<{}> => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isImportant, setIsImportant] = useState(false);

    const onSubmitButton = ()=>{
        addNewItem(title, description, isImportant);
        setTitle('');
        setDescription('');
        setIsImportant(false);
    };

    return (
        <div className="item-form">
            <div className="item-form__field">
                <label className="item-form__field-label">Name:</label>
                <input className="item-form__field-input" value={title} onChange={(obj) => setTitle(obj.target.value)} />
            </div>
            <div className="item-form__field">
                <label className="item-form__field-label">Description:</label>
                <textarea className="item-form__field-textarea" value={description} onChange={(obj) => setDescription(obj.target.value)} />
            </div>
            <div className="item-form__field">
                <label className="item-form__field-label item-form__field-label--checkbox">
                    Is Important:
                </label>
                <input
                    className="item-form__field-input item-form__field-input--checkbox"
                    type="checkbox"
                    checked={isImportant}
                    onChange={(obj) => setIsImportant(obj.target.checked)}
                />
            </div>
            <button className="item-form__submit-button" onClick={onSubmitButton}>Submit</button>
        </div>
    );
};
