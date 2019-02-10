import React, { ReactElement, FunctionComponent } from 'react';
import { RemoveButton } from '../RemoveButton';

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
        <RemoveButton onRemove={() => removeItem(itemId)}/>
    </div>
);
