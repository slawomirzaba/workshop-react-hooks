import React, { ReactElement, FunctionComponent } from 'react';

export const FinishedItemActions: FunctionComponent = (): ReactElement<{}> => (
    <div className="items-column__item-actions">
        <button
            className="items-column__action-button items-column__action-button--check"
            title="Move to to do"
        >
            <i className="fas fa-undo" />
        </button>
        <button
            className="items-column__action-button items-column__action-button--remove"
            title="Remove"
        >
            <i className="fas fa-trash" />
        </button>
    </div>
);
