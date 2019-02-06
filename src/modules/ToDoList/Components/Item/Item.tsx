import React, { ReactElement, FunctionComponent } from 'react';
import { FinishedItemActions } from '../FinishedItemActions';
import { ToDoItemActions } from '../ToDoItemActions';
import { ItemI } from '../../interfaces/ItemI';

interface PropsI extends ItemI {
    removeItem: (itemId: string) => void;
}

export const Item: FunctionComponent<PropsI> = ({
    title,
    description,
    isFinished,
    isImportant,
    removeItem,
    id,
}: PropsI): ReactElement<PropsI> => (
    <div className={`items-column__item ${isImportant ? 'items-column__item--important' : ''}`}>
        <div className="items-column__item-title">
            {isImportant && (
                <span className="items__title-important-icon" title="Important item">
                    <i className="fas fa-exclamation-triangle" />
                </span>
            )}{' '}
            {title}
            <div className="items-column__item-description">{description}</div>
        </div>
        {isFinished ? (
            <FinishedItemActions itemId={id} removeItem={removeItem} />
        ) : (
            <ToDoItemActions isImportantItem={isImportant} itemId={id} removeItem={removeItem} />
        )}
    </div>
);
