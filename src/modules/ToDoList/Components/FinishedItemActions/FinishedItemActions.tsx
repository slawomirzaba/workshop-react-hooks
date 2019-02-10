import React, { ReactElement, FunctionComponent } from 'react';
import { RemoveButton } from '../RemoveButton';

interface PropsI {
    itemId: string;
    removeItem: (itemId: string) => void;
    setIsFinishedItem: (itemId: string, isFinished: boolean) => void;
}

export const FinishedItemActions: FunctionComponent<PropsI> = ({
    itemId,
    removeItem,
    setIsFinishedItem,
}: PropsI): ReactElement<PropsI> => (
    <div className="items-column__item-actions">
        <button
            onClick={() => setIsFinishedItem(itemId, false)}
            className="items-column__action-button items-column__action-button--check"
            title="Move to to do"
        >
            <i className="fas fa-undo" />
        </button>
        <RemoveButton onRemove={() => removeItem(itemId)} />
    </div>
);
