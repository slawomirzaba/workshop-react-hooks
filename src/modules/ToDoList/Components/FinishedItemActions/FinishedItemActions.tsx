import React, { ReactElement, FunctionComponent } from 'react';
import { RemoveButton } from '../RemoveButton';

interface PropsI {
    removeItem: () => void;
    setItemToDo: () => void;
}
export const FinishedItemActions: FunctionComponent<PropsI> = ({removeItem,setItemToDo}:PropsI): ReactElement<{}> => (
    <div className="items-column__item-actions">
        <button
            className="items-column__action-button items-column__action-button--check"
            title="Move to to do"
            onClick={setItemToDo}
        >
            <i className="fas fa-undo" />
        </button>
        <RemoveButton removeItem={removeItem}/>
    </div>
);
