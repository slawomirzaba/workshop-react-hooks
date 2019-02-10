import React, { ReactElement, FunctionComponent, useEffect } from 'react';
import { FinishedItemActions } from '../FinishedItemActions';
import { ToDoItemActions } from '../ToDoItemActions';
import { ItemI } from '../../interfaces/ItemI';

interface PropsI extends ItemI {
    columnTitle: string;
    removeItem: (itemId: string) => void;
    toggleIsImportantItem?: (itemId: string) => void;
    setIsFinishedItem: (itemId: string, isFinished: boolean) => void;
}

export const Item: FunctionComponent<PropsI> = ({
    columnTitle,
    title,
    description,
    isFinished,
    isImportant,
    removeItem,
    id,
    setIsFinishedItem,
    toggleIsImportantItem,
}: PropsI): ReactElement<PropsI> => {
    useEffect(() => {
        return () => {
            alert(`Item has been moved from '${columnTitle}' columns`);
        };
    }, []);

    return (
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
                <FinishedItemActions
                    itemId={id}
                    removeItem={removeItem}
                    setIsFinishedItem={setIsFinishedItem}
                />
            ) : (
                <ToDoItemActions
                    isImportantItem={isImportant}
                    itemId={id}
                    removeItem={removeItem}
                    setIsFinishedItem={setIsFinishedItem}
                    toggleIsImportantItem={toggleIsImportantItem || (() => {})}
                />
            )}
        </div>
    );
};
