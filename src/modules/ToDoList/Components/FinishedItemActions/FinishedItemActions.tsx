import React, { ReactElement, FunctionComponent } from 'react';

interface PropsI {
    itemId: string;
    removeItem: (itemId: string) => void;
}

export const FinishedItemActions: FunctionComponent<PropsI> = ({
    itemId,
    removeItem,
}: PropsI): ReactElement<PropsI> => (
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
            onClick={() => removeItem(itemId)}
        >
            <i className="fas fa-trash" />
        </button>
    </div>
);
