import React, { FunctionComponent, ReactElement } from 'react';

interface PropsI {
    removeItem: () => void;
}
export const RemoveButton: FunctionComponent<PropsI> = ({removeItem}:PropsI): ReactElement<{}> => (
    <button
        className="items-column__action-button items-column__action-button--remove"
        title="Remove"
        onClick={removeItem}
    >
        <i className="fas fa-trash" />
    </button>
);
