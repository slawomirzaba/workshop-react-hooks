import React, { ReactElement, FunctionComponent } from 'react';
import { FinishedItemActions } from '../FinishedItemActions';
import { ToDoItemActions } from '../ToDoItemActions';
import { ItemI } from '../../interfaces/ItemI';

interface PropsI extends ItemI {}

export const Item: FunctionComponent<PropsI> = ({
    title,
    description,
    isFinished,
    isImportant,
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
        {isFinished ? <FinishedItemActions /> : <ToDoItemActions isImportantItem={isImportant}/>}
    </div>
);
