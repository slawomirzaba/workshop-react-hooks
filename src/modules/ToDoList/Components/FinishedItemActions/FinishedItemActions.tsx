import React, { ReactElement, FunctionComponent } from 'react';
import { RemoveButton } from '../RemoveButton';

export const FinishedItemActions: FunctionComponent = (): ReactElement<{}> => (
    <div className="items-column__item-actions">
        <button
            className="items-column__action-button items-column__action-button--check"
            title="Move to to do"
        >
            <i className="fas fa-undo" />
        </button>
        <RemoveButton />
    </div>
);
