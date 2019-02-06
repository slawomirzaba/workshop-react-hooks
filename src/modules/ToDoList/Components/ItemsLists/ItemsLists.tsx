import React, { ReactElement, FunctionComponent } from 'react';
import { ItemI } from '../../interfaces/ItemI';
import { ItemsColumn } from '../ItemsColumn';
import { ProgressBar } from '../../../Common/Components/ProgressBar/ProgressBar';

interface PropsI {
    toDoItems: ItemI[];
    finishedItems: ItemI[];
    finishedItemsPercentage: number;
    removeItem: (itemId: string) => void;
}

export const ItemsLists: FunctionComponent<PropsI> = ({
    toDoItems,
    finishedItems,
    finishedItemsPercentage,
    removeItem,
}: PropsI): ReactElement<PropsI> => {
    return (
        <div className="items-columns">
            <ProgressBar percentValue={finishedItemsPercentage.toFixed(2)} />
            <ItemsColumn columnTitle="TO DO" items={toDoItems} removeItem={removeItem} />
            <ItemsColumn columnTitle="FINISHED" items={finishedItems} removeItem={removeItem} />
        </div>
    );
};
