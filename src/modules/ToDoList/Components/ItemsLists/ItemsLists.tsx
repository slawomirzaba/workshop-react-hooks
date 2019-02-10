import React, { ReactElement, FunctionComponent } from 'react';
import { ItemI } from '../../interfaces/ItemI';
import { ItemsColumn } from '../ItemsColumn';
import { ProgressBar } from '../../../Common/Components/ProgressBar/ProgressBar';

interface PropsI {
    toDoItems: ItemI[];
    finishedItems: ItemI[];
    finishedItemsPercentage: number;
    removeItem: (itemId: string) => void;
    toggleIsImportantItem: (itemId: string) => void;
    setIsFinishedItem: (itemId: string, isFinished: boolean) => void;
}

export const ItemsLists: FunctionComponent<PropsI> = ({
    toDoItems,
    finishedItems,
    finishedItemsPercentage,
    removeItem,
    setIsFinishedItem,
    toggleIsImportantItem
}: PropsI): ReactElement<PropsI> => {
    return (
        <div className="items-columns">
            <ProgressBar percentValue={finishedItemsPercentage.toFixed(2)} />
            <ItemsColumn
                columnTitle="TO DO"
                items={toDoItems}
                removeItem={removeItem}
                setIsFinishedItem={setIsFinishedItem}
                toggleIsImportantItem={toggleIsImportantItem}
            />
            <ItemsColumn
                columnTitle="FINISHED"
                items={finishedItems}
                removeItem={removeItem}
                setIsFinishedItem={setIsFinishedItem}
            />
        </div>
    );
};
