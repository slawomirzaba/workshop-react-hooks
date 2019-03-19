import React, {ReactElement, FunctionComponent} from 'react';
import {FinishedItemActions} from '../FinishedItemActions';
import {ToDoItemActions} from '../ToDoItemActions';
import {ItemI} from '../../interfaces/ItemI';

interface PropsI extends ItemI {
    removeItem: (itemId: string) => void;
    setItemFinished: (itemId: string, isFinished: boolean) => void;
}

export const Item: FunctionComponent<PropsI> = ({
                                                    id,
                                                    title,
                                                    description,
                                                    isFinished,
                                                    isImportant,
                                                    removeItem,
                                                    setItemFinished,
                                                }: PropsI): ReactElement<PropsI> => (
    <div className={`items-column__item ${isImportant ? 'items-column__item--important' : ''}`}>
        <div className="items-column__item-title">
            {isImportant && (
                <span className="items__title-important-icon" title="Important item">
                    <i className="fas fa-exclamation-triangle"/>
                </span>
            )}{' '}
            {title}
            <div className="items-column__item-description">{description}</div>
        </div>
        {isFinished ?
            <FinishedItemActions
                removeItem={() => removeItem(id)}
                setItemToDo={() => setItemFinished(id, false)}/> :
            <ToDoItemActions
                isImportantItem={isImportant}
                removeItem={() => removeItem(id)}
                setItemFinished={() => setItemFinished(id, true)}/>}
    </div>
);
