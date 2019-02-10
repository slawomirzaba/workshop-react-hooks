import React, { FunctionComponent, ReactElement } from 'react';
import { RemoveButton } from '../RemoveButton';

interface PropsI {
    isImportantItem: boolean;
    itemId: string;
    removeItem: (itemId: string) => void;
    toggleIsImportantItem: (itemId: string) => void;
    setIsFinishedItem: (itemId: string, isFinished: boolean) => void;
}

export const ToDoItemActions: FunctionComponent<PropsI> = ({
    isImportantItem,
    itemId,
    removeItem,
    setIsFinishedItem,
    toggleIsImportantItem,
}: PropsI): ReactElement<PropsI> => (
    <div className="items-column__item-actions">
        <button
            onClick={() => setIsFinishedItem(itemId, true)}
            className="items-column__action-button items-column__action-button--check"
            title="Mark as finished"
        >
            <i className="fas fa-check" />
        </button>
        <button
            onClick={() => toggleIsImportantItem(itemId)}
            className="items-column__action-button items-column__action-button--important"
            title={isImportantItem ? 'Mark as not important' : 'Mark as important'}
        >
            <i className={isImportantItem ? 'fas fa-star' : 'far fa-star'} />
        </button>
        <RemoveButton onRemove={() => removeItem(itemId)} />
    </div>
);
