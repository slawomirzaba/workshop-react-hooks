import React, { FunctionComponent, ReactElement } from 'react';

interface PropsI {
    onRemove: () => void;
}

export const RemoveButton: FunctionComponent<PropsI> = ({ onRemove }: PropsI): ReactElement<PropsI> => (
    <button
        className="items-column__action-button items-column__action-button--remove"
        title="Remove"
        onClick={onRemove}
    >
        <i className="fas fa-trash" />
    </button>
);
