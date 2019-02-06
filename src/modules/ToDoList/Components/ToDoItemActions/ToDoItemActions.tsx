import React, { FunctionComponent, ReactElement } from 'react';

interface PropsI {
    isImportantItem: boolean;
}

export const ToDoItemActions: FunctionComponent<PropsI> = ({
    isImportantItem,
}: PropsI): ReactElement<PropsI> => (
    <div className="items-column__item-actions">
        <button
            className="items-column__action-button items-column__action-button--check"
            title="Mark as finished"
        >
            <i className="fas fa-check" />
        </button>
        <button
            className="items-column__action-button items-column__action-button--important"
            title={isImportantItem ? 'Mark as not important' : 'Mark as important'}
        >
            <i
                className={isImportantItem ? 'fas fa-star' : 'far fa-star'}
            />
        </button>
        <button
            className="items-column__action-button items-column__action-button--remove"
            title="Remove"
        >
            <i className="fas fa-trash" />
        </button>
    </div>
);
