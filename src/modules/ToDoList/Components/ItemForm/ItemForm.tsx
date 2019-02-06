import React, { FunctionComponent, ReactElement } from 'react';

export const ItemForm: FunctionComponent = (): ReactElement<{}> => {
    return (
        <div className="item-form">
            <div className="item-form__field">
                <label className="item-form__field-label">Name:</label>
                <input className="item-form__field-input" />
            </div>
            <div className="item-form__field">
                <label className="item-form__field-label">Description:</label>
                <textarea className="item-form__field-textarea" />
            </div>
            <div className="item-form__field">
                <label className="item-form__field-label item-form__field-label--checkbox">
                    Is Important:
                </label>
                <input
                    className="item-form__field-input item-form__field-input--checkbox"
                    type="checkbox"
                />
            </div>
            <button className="item-form__submit-button">Submit</button>
        </div>
    );
};
