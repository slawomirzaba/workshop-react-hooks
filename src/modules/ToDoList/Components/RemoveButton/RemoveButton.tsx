import React, { FunctionComponent, ReactElement } from 'react';

export const RemoveButton: FunctionComponent = (): ReactElement<{}> => (
    <button
        className="items-column__action-button items-column__action-button--remove"
        title="Remove"
    >
        <i className="fas fa-trash" />
    </button>
);
